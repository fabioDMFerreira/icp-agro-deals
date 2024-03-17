import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Trie "mo:base/Trie";
import Nat32 "mo:base/Nat32";
import Error "mo:base/Error";
import Principal "mo:base/Principal";
import List "mo:base/List";
import Time "mo:base/Time";
import Vector "mo:vector/Class";

shared (installer) actor class DealsManager() {
  let indexOutOfBoundsErr = "Index out of bounds";
  let invalidMilestoneErr = "Status should be current status + 1";
  let notFoundErr = "Not found";
  let unauthorizedErr = "Unauthorized";

  type Milestone = {
    description : Text;
    location : Text;
    date : Text;
    unlockedFundsPercentage : Nat;
  };

  type Feature = {
    description : Text;
    values : [Text];
  };

  type Price = {
    description : Text;
    price : Text;
    unit : Text;
  };

  public type DealId = Nat;

  public type Deal = {
    id : Nat;
    status : Nat;
    hsCode : Text;
    productName : Text;
    productDescription : Text;
    price : Text;
    finalCall : Text;
    contractAmount : Text;
    contractId : Text;
    // fundedAmount : Text;
    duration : Text;
    profit : Text;
    risk : Text;
    supplierMessage : Text;
    origin : Text;
    destination : Text;
    milestones : [Milestone];
    features : [Feature];
    prices : [Price];
  };

  private type CreateDealDTO = {
    hsCode : Text;
    productName : Text;
    productDescription : Text;
    price : Text;
    finalCall : Text;
    contractAmount : Text;
    contractId : Text;
    duration : Text;
    profit : Text;
    risk : Text;
    supplierMessage : Text;
    origin : Text;
    destination : Text;
    milestones : [Milestone];
    features : [Feature];
    prices : [Price];
  };

  type LogEntry = {
    timestamp : Time.Time;
    message : Text;
  };

  private let listLimit = 10;

  private stable var owner : Principal = installer.caller;

  private stable var next : DealId = 0;
  private stable var deals : Trie.Trie<DealId, Deal> = Trie.empty();
  private stable var logs : Trie.Trie<DealId, List.List<LogEntry>> = Trie.empty();

  public func setOwner(newOwner : Principal) : async () {
    isOwner();

    owner := newOwner;
  };

  public func createDeal(payload : CreateDealDTO) : async Result.Result<(), Text> {
    isOwner();

    let dealId = next;
    next += 1;

    let deal : Deal = {
      id = dealId;
      status = 0;
      hsCode = payload.hsCode;
      productName = payload.productName;
      productDescription = payload.productDescription;
      price = payload.price;
      finalCall = payload.finalCall;
      contractAmount = payload.contractAmount;
      contractId = payload.contractId;
      duration = payload.duration;
      profit = payload.profit;
      risk = payload.risk;
      supplierMessage = payload.supplierMessage;
      origin = payload.origin;
      destination = payload.destination;
      milestones = payload.milestones;
      features = payload.features;
      prices = payload.prices;
    };

    upsertDeal(dealId, deal);
    log(dealId, "deal created");

    #ok(());
  };

  public func changeStatus(dealId : Nat, newStatus : Nat) : async Result.Result<(), Text> {
    isOwner();

    if (dealId >= next) {
      return #err(indexOutOfBoundsErr);
    };

    switch (getDeal(dealId)) {
      case null return #err(notFoundErr);
      case (?deal) {
        if (+deal.status + 1 != newStatus) {
          return #err(invalidMilestoneErr);
        };

        let update = {
          id = deal.id;
          status = newStatus;
          hsCode = deal.hsCode;
          productName = deal.productName;
          productDescription = deal.productDescription;
          price = deal.price;
          finalCall = deal.finalCall;
          contractAmount = deal.contractAmount;
          contractId = deal.contractId;
          duration = deal.duration;
          profit = deal.profit;
          risk = deal.risk;
          supplierMessage = deal.supplierMessage;
          origin = deal.origin;
          destination = deal.destination;
          milestones = deal.milestones;
          features = deal.features;
          prices = deal.prices;
        };

        upsertDeal(dealId, update);
        log(dealId, "deal status changed to " # Nat.toText(newStatus));
      };
    };

    #ok();
  };

  public query func get(dealId : Nat) : async Result.Result<?Deal, Text> {
    if (dealId >= next) {
      return #err(indexOutOfBoundsErr);
    } else {
      let deal = getDeal(dealId);

      if (deal == null) {
        return #err(notFoundErr);
      };

      return #ok(deal);
    };
  };

  public query func list(offset : Nat) : async Result.Result<[Deal], Text> {
    if (offset >= next) {
      return #ok([]);
    };

    var result = Vector.Vector<Deal>();
    label appender for (i in Iter.range(offset, offset + listLimit)) {
      if (i >= next) {
        break appender;
      };

      switch (getDeal(i)) {
        case null ();
        case (?deal) {
          result.add(deal);
        };
      };
    };
    return #ok(Vector.toArray(result));
  };

  public shared ({ caller }) func isOwner() {
    if (caller != owner) {
      throw Error.reject(unauthorizedErr);
    };
  };

  public query func listLogs(dealId : Nat) : async Result.Result<[LogEntry], Text> {
    let logs = getLogs(dealId);

    switch (logs) {
      case null {
        return #err(notFoundErr);
      };
      case (?logs) {
        return #ok(List.toArray(logs));
      };
    };
  };

  private func upsertDeal(dealId : Nat, deal : Deal) : () {
    deals := Trie.replace(
      deals,
      dealKey(dealId),
      Nat.equal,
      ?deal,
    ).0;
  };

  private func getDeal(x : DealId) : ?Deal {
    return Trie.find(deals, dealKey(x), Nat.equal);
  };

  private func dealKey(x : DealId) : Trie.Key<DealId> {
    return { hash = Nat32.fromNat(x); key = x };
  };

  private func log(dealId : Nat, message : Text) {
    let record : LogEntry = {
      timestamp = Time.now();
      message;
    };

    switch (getLogs(dealId)) {
      case null {
        var logEntries = List.nil<LogEntry>();

        let update = List.push(
          record,
          logEntries,
        );

        switch (update) {
          case null ();
          case (logsEntries) {
            upsertLogs(dealId, logsEntries);
          };
        };
      };
      case (?logs) {
        let update = List.push(record, logs);
        switch (update) {
          case null ();
          case (logsEntries) {
            upsertLogs(dealId, logsEntries);
          };
        };
      };
    };

  };

  private func upsertLogs(dealId : Nat, logsEntries : List.List<LogEntry>) : () {
    logs := Trie.replace(
      logs,
      dealKey(dealId),
      Nat.equal,
      ?logsEntries,
    ).0;
  };

  private func getLogs(x : DealId) : ?List.List<LogEntry> {
    return Trie.find(logs, dealKey(x), Nat.equal);
  };
};

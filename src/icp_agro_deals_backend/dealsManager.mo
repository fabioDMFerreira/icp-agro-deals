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
    number : Nat;
  };

  public type DealId = Nat;

  public type Deal = {
    id : Nat;
    name : Text;
    description : Text;
    milestones : [Milestone];
    funds : Nat;
    status : Nat;
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

  public func createDeal(name : Text, description : Text, milestones : [Milestone], funds : Nat) : async Result.Result<(), Text> {
    isOwner();

    let dealId = next;
    next += 1;

    let deal : Deal = {
      id = dealId;
      name;
      description;
      milestones;
      funds;
      status = 0;
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
          id = dealId;
          name = deal.name;
          description = deal.description;
          milestones = deal.milestones;
          funds = deal.funds;
          status = newStatus;
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

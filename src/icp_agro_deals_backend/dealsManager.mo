import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Trie "mo:base/Trie";
import Nat32 "mo:base/Nat32";
import Error "mo:base/Error";
import Principal "mo:base/Principal";
import Vector "mo:vector/Class";

shared (installer) actor class DealsManager() {
  let indexOutOfBoundsErr = "Index out of bounds";
  let invalidMilestoneErr = "Status should be current status + 1";
  let notFoundErr = "Not found";
  let unauthorizedErr = "Unauthorized";
  let listLimit = 10;

  type Milestone = {
    description : Text;
    number : Nat;
  };

  public type DealId = Nat;

  public type Deal = {
    name : Text;
    description : Text;
    milestones : [Milestone];
    funds : Nat;
    status : Nat;
  };

  private stable var next : DealId = 0;
  private stable var deals : Trie.Trie<DealId, Deal> = Trie.empty();
  private stable var owner : Principal = installer.caller;

  public func setOwner(newOwner : Principal) : async () {
    isOwner();

    owner := newOwner;
  };

  public func createDeal(name : Text, description : Text, milestones : [Milestone], funds : Nat) : async Result.Result<(), Text> {
    isOwner();

    let dealId = next;
    next += 1;

    let deal : Deal = {
      name;
      description;
      milestones;
      funds;
      status = 0;
    };

    upsertDeal(dealId, deal);

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
          name = deal.name;
          description = deal.description;
          milestones = deal.milestones;
          funds = deal.funds;
          status = newStatus;
        };

        upsertDeal(dealId, update);
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
};

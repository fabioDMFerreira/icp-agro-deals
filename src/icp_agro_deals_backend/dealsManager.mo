import Buffer "mo:base/Buffer";
import Error "mo:base/Error";
import Iter "mo:base/Iter";
// import Principal "mo:base/Principal";
import DealsLog "canister:icp_agro_deals_log";
import Nat "mo:base/Nat";

actor {

  // let owner = msg.caller;

  type Milestone = {
    description : Text;
    number : Nat;
  };

  type Deal = {
    name : Text;
    description : Text;
    milestones : [Milestone];
    funds : Nat;
    status : Nat;
  };

  let deals = Buffer.Buffer<Deal>(5);

  // public func setOwner(newOwner : Principal) : async () {
  //   assert (owner == msg.caller);

  //   owner := newOwner;
  // };

  public func createDeal(name : Text, description : Text, milestones : [Milestone], funds : Nat) : async () {
    // assert (owner == msg.caller);

    let newDeal : Deal = {
      name;
      description;
      milestones;
      funds;
      status = 0;
    };
    deals.add(newDeal);
    await DealsLog.create("deal created", deals.size() - 1);
  };

  public func changeStatus(dealIndex : Nat, newStatus : Nat) : async () {
    // assert (owner == msg.caller);

    if (dealIndex >= deals.size()) {
      throw Error.reject("Deal index out of bounds");
    } else {
      let deal = deals.get(dealIndex);

      if (+deal.status + 1 != newStatus) {
        throw Error.reject("Status should be current status + 1");
      };

      let update = {
        name = deal.name;
        description = deal.description;
        milestones = deal.milestones;
        funds = deal.funds;
        status = newStatus;
      };
      deals.put(dealIndex, update);
    };
    let logMessage : Text = "current deal milestone is " # Nat.toText(newStatus);
    await DealsLog.create(logMessage, deals.size() - 1);
  };

  public query func get(dealIndex : Nat) : async ?Deal {
    if (dealIndex >= deals.size()) {
      return null;
    } else {
      return deals.getOpt(dealIndex);
    };
  };

  public query func list(offset : Nat) : async [Deal] {
    if (offset >= deals.size()) {
      return [];
    };

    var result = Buffer.Buffer<Deal>(10);
    label appender for (i in Iter.range(offset, offset +10)) {
      if (i >= deals.size()) {
        break appender;
      };
      let deal = deals.get(i);
      result.add(deal);
    };
    return result.toArray();
  };

};

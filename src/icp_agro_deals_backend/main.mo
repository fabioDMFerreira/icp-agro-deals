import Buffer "mo:base/Buffer";
import Error "mo:base/Error";

actor _DealActor {

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

  public func createDeal(name : Text, description : Text, milestones : [Milestone], funds : Nat, status : Nat) : async () {
    let newDeal : Deal = {
      name;
      description;
      milestones;
      funds;
      status;
    };
    deals.add(newDeal);
  };

  public func changeDealStatus(dealIndex : Nat, newStatus : Nat) : async () {
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
  };

  public query func getDealDetails(dealIndex : Nat) : async ?Deal {
    if (dealIndex >= deals.size()) {
      return null;
    } else {
      return deals.getOpt(dealIndex);
    };
  };

};

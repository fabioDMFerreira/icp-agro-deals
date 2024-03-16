import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Time "mo:base/Time";

actor {

  type LogEntry = {
    timestamp : Time.Time;
    message : Text;
    deal : Nat;
  };

  let log = Buffer.Buffer<LogEntry>(5);

  public func create(message : Text, deal : Nat) : async () {
    let entry : LogEntry = {
      message;
      deal;
      timestamp = Time.now();
    };
    log.add(entry);
  };

  public query func list(offset : Nat) : async [LogEntry] {
    if (offset >= log.size()) {
      return [];
    };

    var result = Buffer.Buffer<LogEntry>(10);
    label appender for (i in Iter.range(offset, offset +10)) {
      if (i >= log.size()) {
        break appender;
      };
      let deal = log.get(i);
      result.add(deal);
    };
    return result.toArray();
  };

};

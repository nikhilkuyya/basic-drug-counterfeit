"use strict";
const State = require("./state.js");

/**
 * StateList provides a named virtual container for a set of ledger states.
 * Each state has a unique key which associates it with the container, rather
 * than the container containing a link to the state. This minimizes collisions
 * for parallel transactions on different states.
 */
class StateList {
  /**
   * Store Fabric context for subsequent API access, and name of list
   */
  constructor(ctx, listName) {
    this.ctx = ctx;
    this.name = listName;
    this.supportedClasses = {};
  }

  getPartialCompositeKey(...args) {
    return this.ctx.stub.createCompositeKey(this.name, State.makeKey(args));
  }

  getCompositeKey(state) {
    return this.ctx.stub.createCompositeKey(this.name, state.getSplitKey());
  }

  /**
   *This will return the StateQueryIterator.
   * @param {string[]} partialKey : partial composite key
   */
  async getStateByPartialCompositeKey(partialKey) {
    try {
      const res = await this.ctx.stub.getStateByPartialCompositeKey(
        this.name,
        State.splitKey(partialKey)
      );
      const list = [];
      let hasNext = true;
      while (hasNext) {
        let val = await res.next();
        if (val && val.value && val.value.key) {
          let compositKey = val.value.key;
          const state = await this.getStateByCompositeKey(compositKey);
          list.push(state);
          hasNext = !val.done;
        } else {
          hasNext = false;
        }
      }
      await res.close();
      return list;
    } catch (e) {
      throw new Error(e);
    }
  }
  /**
   * Add a state to the list. Creates a new state in worldstate with
   * appropriate composite key.  Note that state defines its own key.
   * State object is serialized before writing.
   */
  async addState(state) {
    let key = this.ctx.stub.createCompositeKey(this.name, state.getSplitKey());
    let data = State.serialize(state);
    await this.ctx.stub.putState(key, data);
  }

  async getHisotryResults(iterator) {
    const allResults = [];
    /*eslint no-constant-condition: 0 */
    while (true) {
      const res = await iterator.next();
      if (res.value) {
        const currentData = res.value;
        const timeStamp = currentData.getTimestamp();
        const txId = currentData.getTxId();

        allResults.push({
          state: JSON.parse(
            currentData.value.toString("utf8").split("\u0000").join("")
          ),
          timeStamp,
          txId,
        });
      }

      // check to see if we have reached then end
      if (res.done) {
        // explicitly close the iterator
        await iterator.close();
        return allResults;
      }
    }
  }

  async getHistory(key) {
    let ledgerCompositeKey = this.ctx.stub.createCompositeKey(
      this.name,
      State.splitKey(key)
    );
    const stateHistoriesIterator = await this.ctx.stub.getHistoryForKey(
      ledgerCompositeKey
    );
    try {
      return await this.getHisotryResults(stateHistoriesIterator);
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * Get a state from the list using supplied keys. Form composite
   * keys to retrieve state from world state. State data is deserialized
   * into JSON object before being returned.
   */
  async getState(key) {
    let ledgerKey = this.ctx.stub.createCompositeKey(
      this.name,
      State.splitKey(key)
    );
    const ledgerState = await this.getStateByCompositeKey(ledgerKey);
    return ledgerState;
  }

  async getStateByCompositeKey(ledgerCompositeKey) {
    let data = await this.ctx.stub.getState(ledgerCompositeKey);
    return this._convertBufferToObject(data);
  }

  _convertBufferToObject(data) {
    if (data && data.toString().length !== 0) {
      let state = State.deserialize(data, this.supportedClasses);
      return state;
    } else {
      return null;
    }
  }

  /**
   * Update a state in the list. Puts the new state in world state with
   * appropriate composite key.  Note that state defines its own key.
   * A state is serialized before writing. Logic is very similar to
   * addState() but kept separate becuase it is semantically distinct.
   */
  async updateState(state) {
    let key = this.ctx.stub.createCompositeKey(this.name, state.getSplitKey());
    let data = State.serialize(state);
    await this.ctx.stub.putState(key, data);
  }

  /** Stores the class for future deserialization */
  use(stateClass) {
    this.supportedClasses[stateClass.getClass()] = stateClass;
  }
}

module.exports = StateList;

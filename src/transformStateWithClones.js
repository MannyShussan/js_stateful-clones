'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayState = [];
  let newState = { ...state };

  actions.forEach((action) => {
    let s = { ...newState };

    switch (action.type) {
      case 'addProperties':
        for (const prop in action.extraData) {
          Object.assign(s, { [prop]: action.extraData[prop] });
        }
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete s[keyToRemove];
        }
        break;

      case 'clear':
        s = {};
        break;
    }

    arrayState.push(s);
    newState = { ...s };
  });

  return arrayState;
}

module.exports = transformStateWithClones;

'use strict'

/**
 * Description:
 *      Method used to notify the application of events.
 *
 */
 glShark.events = (function () {
    const registered = {};


    // APP EVENTS
    const APP_LOADED = 'appLoaded';

    // EVENT METHODS
    /**
     * Registers a function to listen for an event to be dispatched.
     * Both parameters must be defined to register.
     *
     * @param {String} event a non-null event
     * @param {Function} fn a non-null function (prototype: function(data))
     * @param {Object} scope the scope on which to call the function
     */
    const register = (event, fn, scope) => {
        if (event && fn) {
            let list = registered[event];
            if (!list) {
                list = [];
                registered[event] = list;
            }
            list.push({ fn: fn, scope: scope });
        }
    } // register

    /**
     * Unregister a function to listen for an event to be dispatched.
     * Both parameters must be defined to unregister.
     *
     * @param {String} event a non-null event
     * @param {Function} fn a non-null function
     */
    const unregister = (event, fn) => {
        if (event && fn) {
            let list = registered[event];
            if (list) {
                var index = list.indexOf(fn);
                if (index >= 0) {
                    list.splice(index, 1);
                }
                if (list.length == 0) {
                    delete registered[event];
                }
            }
        }
    } // unregister

    /**
     * Sends the data to all functions that have been registered for an event.
     * The event is not dispatched if the event param is not defined.
     *
     * @param {String} event the event to dispatch
     * @param {Object} data the data, optional
     */
    const send = (event, data) => {
        if (event) {
            console.log('sending out EVENT', event, data);

            let list = registered[event];
            if (list) {
                list.forEach(function (d) {
                    if (d.scope) {
                        d.fn.apply(d.scope, [data]); // could use d.fn.call(d.scope, data);
                    } else {
                        d.fn(data);
                    }
                })
            }
        }
    } // send

    return {
        APP_LOADED,

        register,
        unregister,
        send,
    } // End return (PUBLIC section)

})();
;(function($) {
  // Event Manager lets you organize your javascript events by using the power of the delegate method
  $.fn.eventManager = function(events) {
    var eventList = {}; // yeah this is the event list array

    // okay it's time to sort!
    for (globalSelector in events) {
      for (eventType in events[globalSelector]) {
        // we sort by events :)
        if (typeof eventList[eventType] == 'undefined') {
          eventList[eventType] = globalSelector;
        } else {
          eventList[eventType] += ', '+globalSelector;
        }
      }
    }

    var $global = $(this); // the object container of the event list

    for (eventType in eventList) {
      $global.delegate(eventList[eventType], eventType, function(e){
        for (globalSelector_p in events) {
          if ($(this).is(globalSelector_p)) {
            var selectors = events[globalSelector_p][e.type];
            if (typeof selectors == 'function') {
              selectors.call(this, e, $global);
            } else {
              for (selector_p in selectors) {
                if (($(this).is(selector_p) || selector_p == 'default') && typeof selectors[selector_p] != 'undefined') {
                  selectors[selector_p].call(this, e, $global);
                }
              }
            }
          }
        }
      });
    }
    return this; // no I won't break the chain!
  };
})(jQuery);

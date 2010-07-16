;(function($) {
  // Event Manager lets you organize your javascript events by using the power of the delegate method
  $.fn.eventManager = function(events) {
    var eventList = {}; // yeah this is the event list array

    // okay it's time to sort!
    for (globalSelector in events) {
      for (eventType in events[globalSelector]) {
        // we sort by events :)
        if (typeof eventList[eventType] == 'undefined')
          eventList[eventType] = globalSelector;
        else
          eventList[eventType] += ', '+globalSelector;
      }
    }

    var $global = $(this); // the object container of the event list

    for (eventType in eventList) {
      $global.delegate(eventList[eventType], eventType, function(e){
        for (globalSelector_p in events) {
          if ($(this).is(globalSelector_p)) {
            for (selector_p in events[globalSelector_p][e.type]) {
            var that = this,
                $this = $(this);
            if (($this.is(selector_p) || selector_p == 'default') && typeof events[globalSelector_p][e.type][selector_p] != 'undefined')
              events[globalSelector_p][e.type][selector_p](that,e,$global);
            }
          }
        }
      });
    }
    return this; // no I won't break the chain!
  };
})(jQuery);

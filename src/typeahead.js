enyo.kind(
    {tag: 'input',
        kind :enyo.Control,
        shown: false,
        name: 'Typeahead',
        create: function() {
            this.inherited(arguments);
            this.valueChanged();
        },
        handlers: {onkeypress: 'keypressed',
            onkeyup: 'keyup'
        },

        keypressed: function (sender, e) {
            console.log('pressed owner');
        },

        keyup: function(sender, e) {
          switch(e.keyCode) {
              case 40: //down arrow
              case 38: //up arrow
                break;

              case 9: //tab
              case 13: //enter
                if(!this.shown) return;
                this.select();
                break;
              default:
                  this.lookup();
          }
          e.preventDefault();
          return true;
        },

        select: function() {
            console.log('select');
        },

        lookup: function() {
            console.log('lookup');

        },

        published: {
            value: "123"
        },
        valueChanged: function() {
            this.setAttribute("value", this.value);
        }
    }
);
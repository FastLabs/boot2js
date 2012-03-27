enyo.kind( {
        tag: 'ul',
        kind: enyo.Control,
        name: 'BootMenu',
        create: function () {
            this.inherited(arguments);
            this.addClass('typeahead');
            this.addClass('dropdown-menu');

        },
        components: [],
        addItem: function(item) {
            this.createComponent({
                kind: enyo.Control,
                tag: 'li',
                content: item
                }
            );
            console.log('add item');
        }



    }
);

enyo.kind(
    {tag: 'input',
        kind :enyo.Control,
        shown: false,
        name: 'Typeahead',
        create: function() {

            this.inherited(arguments);
            this.valueChanged();
            var menu = new BootMenu();

        },
        handlers: {onkeypress: 'keypressed',
            onkeyup: 'keyup'
        },
        components: [{kind: BootMenu, name: 'menu'}],

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
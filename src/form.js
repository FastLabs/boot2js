enyo.kind({
    name: 'views.Input',
    kind: enyo.Control,
    tag: 'input',
    create: function() {
        this.inherited(arguments);
        this.textChanged();
    },

    published : {
        text: ''
    },
    textChanged :function () {
        //console.log('value changed' + this.text);
        this.setAttribute('value', this.text);
    }
});

enyo.kind({
    kind: enyo.Control,
    name: 'views.ControlLabel',
    tag: 'label',
    class: 'control-label',
    content: 'Text input',
    create : function() {
        this.inherited(arguments);
        this.setAttribute("for", 'textControl');
        this.addClass('control-label');
    }
});

enyo.kind({ name: 'views.LabeledInput',
        tag: 'div',
        kind: enyo.Control,
        create: function() {
            this.inherited(arguments);
            this.addClass('control-group');
            this.$.input.addClass('controls');
            this.$.text_input.addClass('input-xlarge');
            this.textChanged();
            this.labelChanged();
        },
        published: {
            text: '',
            label: '',
            help: ''
        },
        components: [
            { name: 'label', kind: views.ControlLabel },
            {
                name: 'input',
                tag: 'div',
                components: [
                    {
                        kind: views.Input,
                        id: 'textControl',
                        name: 'text_input'
                    }
                ]
            }
        ],
        textChanged : function() {
            this.$.text_input.setText(this.text);
        },
        labelChanged: function() {
            this.$.label.setContent(this.label);
        },
        helpChanged: function() {
            //TODO: implement rendering
        },
        showInlineHelp: function() {
            this.$.input.createComponent({
                id: 'inlineHelp',
                tag: 'span',
                name: 'inlineHelp',
                content: this.help
            });
            console.log('show inline help');
            this.$.input.$.inlineHelp.addClass('help-inline');
            this.$.input.$.inlineHelp.render();
        },

        hideInlineHelp :function() {
            //TODO: check if inline help is present
            this.$.input.$.inlineHelp.destroy();
        },

        showBlockHelp: function() {
            //TODO: check if the blockHelp is not present
            this.$.input.createComponent({
                id : '',
                tag: 'p',
                name: 'blockHelp',
                content: this.help
            });
            this.$.input.$.blockHelp.addClass('help-block');
            this.$.input.$.blockHelp.render();
        },
        hideBlockHelp: function () {
            //TODO: check if the blockHelp is present
            this.$.input.$.blockHelp.destroy();
        }
    }
);


enyo.kind({
    name: 'views.Form',
    kind: enyo.Control,
    tag: 'form',
    create: function() {
        this.inherited(arguments);
        this.addClass('form-horizontal');
        this.$.input2.addClass('warning');
        this.$.input3.addClass('error');
    },
    components: [
        { tag: 'fieldset',
            components: [
                { name: 'legend', tag: 'legend', content: 'Global currencies'},
                {name: 'input1', kind: views.LabeledInput, text: 'USD', label: 'USA currency', help: 'some help provided'},
                {name: 'input2', kind: views.LabeledInput, text: 'EUR', label: 'Europe currency', help: 'us help provided'},
                {name: 'input3', kind: views.LabeledInput, text: 'GBP', label: 'UK currency'},
                {name: 'input4', kind: views.Input, text: 'test' }
            ]
        }
    ]

});
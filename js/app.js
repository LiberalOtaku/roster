$(document).foundation();

var app = {
  // initialize app
  init: function() {
    this.setupEventListeners();
  },

  setupEventListeners: function() {
    document.querySelector('form').onsubmit = this.addStudent.bind(this);
  },

  // now build the actual list for each new name
  buildList: function(name) {
    var dl = document.createElement('dl');
    dl.style.border = '0px solid blue';

    var li = document.createElement('li');
    var dt = document.createElement('dt');
    dt.innerText += name;
    li.appendChild(dt);

    var dd = document.createElement('dd');
    var ul = document.createElement('ul');
    ul.className = "button-group";

    // create edit field
    var input = document.createElement('input');
    input.type = "text";
    input.className = "edit";
    input.placeholder = "Enter Student Name";
    input.value = dt.innerText;

    var editLink = this.buildLink({
      text: 'edit',
      class: "edit button small radius secondary",
      handler: function() {
        dt.innerText = '';
        dt.appendChild(input);

        ul.replaceChild(submitLink, editLink);
      }
    });

    var submitLink = this.buildLink({
      text: 'submit',
      class: "submit button small radius success",
      handler: function() {
        if (input.value != '') {
          dt.innerHTML = '';
          dt.innerText = input.value;

          ul.replaceChild(editLink, submitLink);
        }
      }
    });

    var deleteLink = this.buildLink({
      text: 'remove',
      class: "remove button small radius alert",
      handler: function() {
        dl.remove();
        app.refreshRoster();
      }
    });

    var promoteLink = this.buildLink({
      text: 'promote',
      class: "promote button small radius",
      handler: function() {
        // just switching the item border for now
        if (dl.style.border == '0px solid blue')
          dl.style.border = '1px solid blue';
        else dl.style.border = '0px solid blue';
      }
    });

    var topLink = this.buildLink({
      text: 'top',
      class: "top button small radius",
      handler: function() {
        // move item to the top
        var list = document.querySelector('#studentList');
        var currentName = dl;
        var nextName = dl.previousElementSibling;

        while (nextName != null) {
          list.insertBefore(currentName, nextName);
          nextName = currentName.previousElementSibling;
        }

        app.refreshRoster();
      }
    });

    var upLink = this.buildLink({
      text: 'up',
      class: "up button small radius",
      handler: function() {
        // move item up one space
        if (dl.previousElementSibling != null) {
          var list = document.querySelector('#studentList');
          list.insertBefore(dl, dl.previousElementSibling);
          app.refreshRoster();
        }
      }
    });

    var downLink = this.buildLink({
      text: 'down',
      class: "down button small radius",
      handler: function() {
        // move item down one space
        if (dl.nextElementSibling != null) {
          var list = document.querySelector('#studentList');
          list.insertBefore(dl, dl.nextElementSibling.nextElementSibling);
          app.refreshRoster();
        }
      }
    });

    ul.appendChild(editLink);
    ul.appendChild(deleteLink);
    ul.appendChild(promoteLink);
    ul.appendChild(topLink);
    ul.appendChild(upLink);
    ul.appendChild(downLink);
    dd.appendChild(ul);
    li.appendChild(dd);
    dl.appendChild(li);
    return dl;
  },

  buildLink: function(options) {
    var link = document.createElement('a');
    link.href = "#";
    link.innerText = options.text;
    link.className = options.class;
    link.onclick = options.handler;

    return link;
  },

  refreshRoster: function() {
    var allTop = document.querySelectorAll('a.top');
    var allUp = document.querySelectorAll('a.up');
    var allDown = document.querySelectorAll('a.down');

    var disableTop = document.querySelector('dl:first-child > li > dd > ul > a.top');
    var disableUp = document.querySelector('dl:first-child > li > dd > ul > a.up');
    var disableDown = document.querySelector('dl:last-child > li > dd > ul > a.down');

    for (var i = 0; i < allTop.length; ++i) {
      allTop[i].className = "top button small radius";
      allUp[i].className = "up button small radius";
      allDown[i].className = "down button small radius";
    }

    disableTop.className = "top button small radius disabled";
    disableUp.className = "up button small radius disabled";
    disableDown.className = "down button small radius disabled";
  },

  // called on form submit
  addStudent: function(event) {
    event.preventDefault();
    var list = document.querySelector('#studentList');
    var form = document.querySelector('#studentForm');
    var studentName = form.studentName.value;

    this.prependChild(list, this.buildList(studentName));
    this.refreshRoster();
    form.reset();
    form.studentName.focus();
  },

  prependChild: function(parent, child) {
    parent.insertBefore(child, parent.firstChild);
  },
};

app.init();

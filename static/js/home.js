// Create the controller
ns.controller = (function(m, v) {
    'use strict';

    let model = m,
        view = v,
        $event_pump = $('body'),
        $fname = $('#fname'),
        $lname = $('#lname'),
        $person_id = $('#person_id'); // Added $person_id

    // Get the data from the model after the controller is done initializing
    setTimeout(function() {
        model.read();
    }, 100);

    // Validate input
    function validate(fname, lname) {
        return fname !== "" && lname !== "";
    }

    // Create our event handlers
    $('#create').click(function(e) {
        let fname = $fname.val(),
            lname = $lname.val();

        e.preventDefault();

        if (validate(fname, lname)) {
            model.create(fname, lname);
        } else {
            alert('Problem with first or last name input');
        }
    });

    $('#update').click(function(e) {
        let person_id = $person_id.val(), // Added person_id
            fname = $fname.val(),
            lname = $lname.val();

        e.preventDefault();

        if (validate(fname, lname)) {
            model.update(person_id, fname, lname); // Updated to include person_id
        } else {
            alert('Problem with first or last name input');
        }
        e.preventDefault();
    });

    $('#delete').click(function(e) {
        let person_id = $person_id.val(), // Added person_id
            lname = $lname.val();

        e.preventDefault();

        if (validate('placeholder', lname)) {
            model.delete(person_id); // Updated to include person_id
        } else {
            alert('Problem with first or last name input');
        }
        e.preventDefault();
    });

    $('#reset').click(function() {
        view.reset();
    });

    $('table > tbody').on('dblclick', 'tr', function(e) {
        let $target = $(e.target),
            person_id, // Added person_id
            fname,
            lname;

        person_id = $target // Added block for person_id
            .parent()
            .find('td.person_id')
            .text();

        fname = $target
            .parent()
            .find('td.fname')
            .text();

        lname = $target
            .parent()
            .find('td.lname')
            .text();

        view.update_editor(person_id, fname, lname);
    });

    // Handle the model events
    $event_pump.on('model_read_success', function(e, data) {
        view.build_table(data);
        view.reset();
    });

    $event_pump.on('model_create_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_update_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_delete_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_error', function(e, xhr, textStatus, errorThrown) {
        let error_msg = textStatus + ': ' + errorThrown + ' - ' + xhr.responseJSON.detail;
        view.error(error_msg);
        console.log(error_msg);
    });
})(ns.model, ns.view);

var o = true;
var p = true;
//Function to open mobile nav
function open() {
    $('#open').click(function () {
        $('.mobile-bar').hide();
        $('.mobile-menu').show();
    });
}


//Function to close movile nav
function close() {
    $('#close').click(function () {
        $('.mobile-bar').show();
        $('.mobile-menu').hide();

        $('#f-drop').click(function () {
            $('.drop').addClass('hide');
        });
    });

}

//Function for the dropdown Filter 
function filterDropdown() {

    $(document).on('click', '.filters-dropdown', function (e) {
        e.preventDefault();
        if (p == true) {
            $('.drop').removeClass('hide');
            p = false;
        } else {
            $('.drop').addClass('hide');
            p = true;
        }

    });

}

//Function toggle form buttons
function toggleFormButtons() {
    $(document).on('click', '.no', function (e) {
        e.preventDefault();
        $('.yes').css('background', 'none', 'color', ' #3f3f3f');
        $('.yes').css('color', ' #3f3f3f');
        $('.no').css('background', '#02c7c6', 'color', '#ffffff');
        $('.no').css('color', '#ffffff');
    });

    $(document).on('click', '.yes', function (e) {
        e.preventDefault();
        $('.no').css('background', 'none', 'color', ' #3f3f3f');
        $('.no').css('color', ' #3f3f3f');
        $('.yes').css('background', '#02c7c6', 'color', '#ffffff');
        $('.yes').css('color', '#ffffff');
    });
}

//Function for opening each modal
function openModal() {
    $(document).on('click', '[data-modal-open]', function (e) {
        event.preventDefault();
        $('.checkmark-name').hide();
        $('.checkmark-phone').hide();
        $('.checkmark-email').hide();
        var targetedModal = $(this).attr('data-modal-open');
        $('[data-modal="' + targetedModal + '"]').fadeIn(350);
        e.preventDefault();

    });
}

//Function for closing each modal
function closeModal() {
    $(document).on('click', '[data-modal-close]', function (e) {
        e.preventDefault();
        $('[data-modal-close]').on('click', function (e) {
            var targetedModal = $(this).attr('data-modal-close');
            $('[data-modal="' + targetedModal + '"]').fadeOut(350);

        });

    });
}

//Function for closing each modal
function thankYouModal() {
    $(document).on('click', '#send', function (e) {
        var targetedModal = $(this).attr('data-modal-thanks');
        e.preventDefault();
        $('[data-modal="' + targetedModal + '"]').fadeOut(350);

        $('[data-modal = modal-thanks]').fadeIn(300);
    });


}


//Function for FilterCheckboxes
function filterCheckboxes() {
    var checked = [];

    $(document).on('click', '[data-filter]', function () {
        var targetedFilter = $(this).attr('data-filter');

        if ($(this).prop('checked')) {
            $('.card').fadeOut(350);
            checked.push(targetedFilter);
            //console.log(checked);

        } else if ($(this).prop('checked') == false) {
            var uncheck = checked.indexOf(targetedFilter);
            checked.shift(uncheck, 1);

            $('.' + targetedFilter + '').fadeOut(350);
            //console.log(checked);
        }
        if (checked.length < 1) {
            $('.card').fadeIn(300);
        } else if (checked.length == 1) {
            $('.' + targetedFilter + '').fadeIn(300);
        } else if (checked.length == 2) {
            for (var two = 0; two <= 2; two++) {

                $('.' + checked[0] + '').fadeIn(300);
                $('.' + checked[1] + '').fadeIn(300);
            }
        } else if (checked.length == 3) {
            for (var two = 0; two <= 3; two++) {

                $('.' + checked[0] + '').fadeIn(300);
                $('.' + checked[1] + '').fadeIn(300);
                $('.' + checked[2] + '').fadeIn(300);
            }
        } else if (checked.length == 4) {
            $('.card').fadeIn(300);
        }



    });

}

//switch checkmark on input
function check(input) {

    $('#user-name').on('input', function () {
        var input = $(this);
        var is_name = input.val();
        if (is_name) {
            $('.circle-name').hide(100);
            $('.checkmark-name').show(100);
        } else {
            $('.checkmark-name').hide(100);
            $('.circle-name').show(100);
        }

    });

    $('#user-email').on('input', function () {
        var input = $(this);
        var is_name = input.val();
        if (is_name) {
            $('.circle-email').hide(100);
            $('.checkmark-email').show(100);
        } else {
            $('.checkmark-email').hide(100);
            $('.circle-email').show(100);
        }
    });

    $('#user-phone').on('input', function () {
        var input = $(this);
        var is_name = input.val();
        if (is_name) {
            $('.circle-phone').hide(100);
            $('.checkmark-phone').show(100);
        } else {
            $('.checkmark-phone').hide(100);
            $('.circle-phone').show(100);
        }
    });
}


//Keep track of Modal number
var count = 0;

// Starts jQuery
$(document).ready(function () {

    if (o === true) {
        open();
    }

    close();

    filterDropdown();


    $.ajax({
        url: '/dealers.json',
        type: 'GET',
        dataType: 'json',
        success: function (data) {

            $.each(data.dealers, function (index, value) {
                //console.log(value.data.name);
                var name = value.data.name;
                var phone = value.data.phone1;
                var weekday = value.data.weekHours.mon;
                var saturday = value.data.weekHours.sat;
                var sunday = value.data.weekHours.sun;
                var install;
                var commercial;
                var residential;
                var service;
                count += 1;
                if (sunday == "") {
                    sunday = "Closed";
                }
                if (saturday == "") {
                    saturday = "Closed";
                }
                var z = value.data.certifications;

                for (i = 0; i <= z.length; i++) {
                    if (z[i] == 'Installation Pro') {
                        install = "installation";
                    } else if (z[i] == 'Residential Pro') {
                        residential = "residential";
                    } else if (z[i] == 'Commercial Pro') {
                        commercial = "commercial";
                    } else if (z[i] == 'Service Pro') {
                        service = "service";
                    }
                    if (service == null) {
                        service = "";
                    }
                    if (commercial == null) {
                        commercial = "";
                    }
                    if (install == null) {
                        install = "";
                    }
                    if (residential == null) {
                        residential = "";
                    }
                }

                phone = phone.replace(/-/g, '.');
                //Pool Cards
                $('#card-wrap').append('<div class="card card-' + count + ' ' + install + ' ' + service + ' ' + residential + ' ' + commercial + '" ><h1 id="name">' + name + '</h1><div id="mobile-icon"><img class="mobile-icon" src="Images/phone-icon-mobile.png"><p class="tap">Tap to call</p><h2>' + phone + '</h2></div><h2 id="phone-number">' + phone + '</h2><p>Can\'t talk know? Click Below to send an email</p><a data-modal-open="modal-' + count + '" href=# class="email-btn"><i class="ss-mail"></i>Contact This Pro</a><h3 id="business-hours">Business Hours</h3><li>Weekdays ' + weekday + '</li></br><li>Saturday ' + saturday + '</li></br><li>Sunday ' + sunday + '</li><section class="categories-' + count + '"></section>');

                //add categories to section 
                for (i = 0; i <= z.length; i++) {

                    var length = z.length;
                    if (z[i] != null) {
                        if (z[i] == 'Installation Pro') {
                            $('.categories-' + count).append('<li class="cat-' + count + '"><i class="ss-star"></i>' + z[i] + '</li>');
                        } else if (z[i] == 'Residential Pro') {
                            $('.categories-' + count).append('<li class="cat-' + count + '"><i class="ss-home"></i>' + z[i] + '</li>');

                        } else if (z[i] == 'Commercial Pro') {
                            $('.categories-' + count).append('<li class="cat-' + count + '"><i class="ss-users"></i>' + z[i] + '</li>');
                        } else if (z[i] == 'Service Pro') {
                            $('.categories-' + count).append('<li class="cat-' + count + '"><i class="ss-settings"></i>' + z[i] + '</li>');
                        }
                    }
                    if (i == z.length) {
                        if (z.length < 4) {
                            var track = 4 - z.length;
                            for (t = 1; t <= track; t++) {
                                $('.categories-' + count).append('<li></li>');

                            }
                        }
                    }
                }


                //Modals
                $('#form-container').append('<div class="overlay" data-modal="modal-' + count + '"><div id="modal-' + name + '" class="modal"><div class="top"><h3>EMAIL</h3><a href="#" data-modal-close="modal-' + count + '"><i class="ss-delete"></i></a><h1 id="modal-name">' + name + '</h1></div>  <div class="form"><form id="pool-form-' + count + '" name="form' + count + '"><p>Fill out the form below and Premium Pools &amp; Spas of Charlotte will get in touch.</p><div class="form-wrap"><label for="name">First and Last Name<span id="circle-name"><img class="circle circle-name" src="Images/circle-form.png"><img class="checkmark-name" src="Images/checkmark-circle.png"></span></label><input type="text" id="user-name" onInput="check(name)"><label for="phone">Phone Number<span id="circle-phone"><img class="circle circle-phone" src="Images/circle-form.png"><img class="checkmark-phone" src="Images/checkmark-circle.png"></span></label><input id="user-phone" type="text" onInput="check()"><label>Email Address<span id="circle-email"><img class="circle circle-email" src="Images/circle-form.png"><img class="checkmark-email" src="Images/checkmark-circle.png"></span></label><input id="user-email" type="text" onInput="check()><label>Comments or Questions<span>optional</span></label><input id="comments" type="text"><label>Do you currently own a pool or space?<span>optional</span></label><button class="yes">Yes</button><button class="no">No</button><a id="send" href="#" data-modal-thanks="modal-' + count + '">Send my email <i class="ss-navigateright"</i></a></div></form></div>');

            });
        }

    }); //end of ajax


    openModal();
    closeModal();
    thankYouModal();
    toggleFormButtons();

    filterCheckboxes();

});
$(document).ready(function() {
    // tooltip only text
    $('.masterTooltip').hover(function() {
        // hover over code
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
            .text(title)
            .appendTo('body')
            .fadeIn('slow');
    }, function() {
        // hover out code
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
    }).mousemove(function(e) {
        var mousex = e.pageX + 20; // get x coordinates
        var mousey = e.pageY + 10; // get y coordinates
        $('.tooltip')
            .css({ top: mousey, left: mousex })
    });

    // change title in <a> tag saved to 'Saved!' and also change
    $('.save-favorite').on('click', function() {
        var saved_status = $(this).children().text();
        var change = $(this).children();
        var id = $(this).data(id).id;
        if (saved_status == 'favorite_border') {
            change.text('favorite');
            console.log(id);
            $.post('/article/save/' + id, function(data) {
                console.log(data);
            });
        } else {
            change.text('favorite_border');
            console.log(id);
            $.post('/article/unsave/' + id, function(data) {
                console.log(data);
            });
        }
    });

});
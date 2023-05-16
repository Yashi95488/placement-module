$(document).ready(function() {

    $('.toggle').click(function() {
        $('.menu-links').show();
        $('.sub-content-link').hide();
    });

    //Acadmic sub menu
    $('#subEle2').click(function() {
        $('.menu-links').slideUp();
        $('#Acadmic-side-sub-menu').slideDown();
    });

    //Placement sub menu
    $('#subEle3').click(function() {
        $('.menu-links').hide();
        $('#Placement-side-sub-menu').show();
    });

    //Fee sub menu
    $('#subEle5').click(function() {
        $('.menu-links').slideUp();
        $('#fee-side-sub-menu').slideDown();
    });

    //Exam sub menu
    $('#subEle6').click(function() {
        $('.menu-links').slideUp();
        $('#exam-side-sub-menu').slideDown();
    });
    // ==============================================================
    // Closing sub menu branches
    $('.uil-angle-left-b').click(function() {
        $('.menu-links').slideDown();
        $('.sub-content-link').slideUp();
    });

    // Logout
    $('#logoutoption').click(function() {
        $('.overlay').css("display", "block");
    });
    $('#cancel').click(function() {
        $('.overlay').css("display", "none");
    });
    $('#logout').click(function() {
        window.location.replace('login.php');
    });

    // notice
    $('#addnotice').click(function() {
        $('#addnotice').hide();
        $('#view').show();
        $('#title2').hide();
        $('#title1').show();
        $('#newnotice').show();
        $('#allnotice').hide();
    });

    $('#view').click(function() {
        $('#addnotice').show();
        $('#view').hide();
        $('#title2').show();
        $('#title1').hide();
        $('#newnotice').hide();
        $('#allnotice').show();
    });



});
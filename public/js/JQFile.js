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
        $('.menu-links').slideUp();
        $('#Placment-side-sub-menu').slideDown();
    });

    //fee sub menu
    $('#subEle5').click(function() {
        $('.menu-links').slideUp();
        $('#fee-side-sub-menu').slideDown();
    });

    //Exam sub menu
    $('#subEle6').click(function() {
        $('.menu-links').slideUp();
        $('#exam-side-sub-menu').slideDown();
    });

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
        window.location.replace('/logout');
    });

    // side nav bar

    $('#place1').click(function() {
        $(this).hide();
        $('#place2').show();

        $('#title1').show();
        $('#title2').hide();

        $('#sec1').show();
        $('#sec2').hide();
    });

    $('#place2').click(function() {
        $(this).hide();
        $('#place1').show();

        $('#title2').show();
        $('#title1').hide();

        $('#sec2').show();
        $('#sec1').hide();
    });
});
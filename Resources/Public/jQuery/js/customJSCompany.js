
$(document).ready(function () {
    //     $(this).on('click', ':button.page-link', '#nextButton', '#previousButton', function () {







    //         console.log($(this).val())

    //         var currentPageNumber = $(this).val();

    //         var controllerpath = $("#uri_hidden").val();
    //         var ajaxPageLimit = $('#ajaxPageLimitCompany').val()
    //         console.log(currentPageNumber, ajaxPageLimit)
    //         $.ajax({
    //             type: "POST",
    //             url: controllerpath,
    //             data: { 'pageNumber': currentPageNumber, 'ajaxPageLimit': ajaxPageLimit },
    //             success: function (response) {
    //                 $('.tr').each(function () {
    //                     $(this).remove()
    //                 })




    //                 $('#defaultLimit').val(ajaxPageLimit)
    //                 $('#defaultLimit').text(ajaxPageLimit)
    //                 var tableRows = $(response).find('.tr')
    //                 $('#trHeader').after(tableRows)
    //                 console.log(tableRows)
    //                 $('#paginationContainer').remove()

    //                 var pagination = $(response).find('#paginationContainer')
    //                 $('#table').after(pagination)

    //             }
    //         })





    //     })

    $('#searchInputCompany').prop('disabled', 'disabled')
    $('#companyProperty').change(function () {

        if ($(this).val() !== '') {
            $('#searchInputCompany').prop('disabled', false)
        } else {
            $('#searchInputCompany').prop('disabled', true)
        }
        if ($('#searchInputCompany').val() !== '') {
            var query = $('#searchInputCompany').val().toLowerCase().trim();
            var companyProperty = $(this).val();
            var limit = $('#ajaxPageLimitCompany').val();

            $.ajax({
                url: $('#uri_hiddenSearchCompany').val().trim(),
                data: {
                    'query': query,
                    'companyProperty': companyProperty,
                    'limit': limit,
                    'currentPage': 1
                },
                method: 'POST',

                success: function (response) {
                    $('.tr').remove()
                    var tableRows = $(response).find('.tr')

                    $('#trHeader').after(tableRows)
                    $('#paginationContainer').remove()

                    var pagination = $(response).find('#paginationContainer')
                    $('#table').after(pagination)

                },
                error: function () {
                    alert("something has gone wrong");
                }
            });
        }

    })
    $("#searchInputCompany").on("keyup", function () {

        var query = $(this).val().toLowerCase().trim();
        var companyProperty = $('#companyProperty').val();
        var limit = $('#ajaxPageLimitCompany').val();
        console.log(limit)
        $.ajax({
            url: $('#uri_hiddenSearchCompany').val().trim(), // separate file for search
            data: {
                'query': query,
                'companyProperty': companyProperty,
                'limit': limit,
                'currentPage': 1
            },
            method: 'POST',

            success: function (response) {
                $('.tr').remove()
                var tableRows = $(response).find('.tr')

                $('#trHeader').after(tableRows)
                $('#paginationContainer').remove()

                var pagination = $(response).find('#paginationContainer')
                $('#table').after(pagination)

            },
            error: function () {
                alert("something has gone wrong");
            }
        });
    });






    $(this).on('click', '.companyPageButton, :button#nextButtonCompany, :button#previousButtonCompany', function () {

        var currentPageNumber = $(this).val();
        console.log($(this).val())
        var controllerpath = $("#uri_hiddenCompany").val();
        var ajaxPageLimit = $('#ajaxPageLimitCompany').val()
        console.log($('#companyProperty').val())
        console.log('company', $('#searchInputCompany').val())
        if ($('#companyProperty').val() === '' && $('#searchInputCompany').val() === '') {


            $.ajax({
                type: "POST",
                url: controllerpath,
                data: { 'pageNumber': currentPageNumber, 'ajaxPageLimit': ajaxPageLimit },
                success: function (response) {
                    $('.tr').each(function () {
                        $(this).remove()
                    })

                    $('#currentLimit').val(ajaxPageLimit)
                    $('#currentLimit').text(ajaxPageLimit)
                    var tableRows = $(response).find('.tr')
                    $('#trHeader').after(tableRows)

                    $('#paginationContainer').remove()

                    var pagination = $(response).find('#paginationContainer')
                    $('#table').after(pagination)

                }
            })
        } else {

            var controllerpath = $("#uri_hiddenSearchCompany").val();
            var limit = $("#ajaxPageLimitCompany").val();
            var query = $("#searchInputCompany").val();
            var currentPageNumber = $(this).val();
            var companyProperty = $('#companyProperty').val()

            $.ajax({
                type: "POST",
                url: controllerpath,
                data: { 'currentPage': currentPageNumber, 'limit': limit, 'query': query, 'companyProperty': companyProperty },
                success: function (response) {
                    $('.tr').each(function () {
                        $(this).remove()
                    })

                    $('#currentLimit').val(limit)
                    $('#currentLimit').text(limit)
                    var tableRows = $(response).find('.tr')
                    $('#trHeader').after(tableRows)

                    $('#paginationContainer').remove()

                    var pagination = $(response).find('#paginationContainer')
                    $('#table').after(pagination)

                }
            })
        }
    })

    $('#ajaxPageLimitCompany').on('change', function () {

        var val = $('#ajaxPageLimitCompany').val();

        var personProperty = $('#companyProperty').val();
        var searchInput = $('#searchInputCompany').val();


        const pageNumber = $('.page-item.disabled').find('#pageButton').val()

        var controllerpath = $("#uri_hiddenCompany").val();
        if (personProperty == '' && searchInput == '') {


            $.ajax({
                type: "POST",
                url: controllerpath,
                data: { 'ajaxPageLimit': val, 'pageNumber': 1 },
                success: function (response) {
                    $('.tr').each(function () {
                        $(this).remove()

                    }
                    )
                    $('.pagination').remove()

                    var pagination = $(response).find('#paginationContainer')
                    $('#table').after(pagination)

                    $('#currentLimit').val(val)
                    $('#currentLimit').text(val)

                    $('#ajaxPageLimitCompany option').show();
                    $('#ajaxPageLimitCompany option:selected').hide();

                    var tableRows = $(response).find('.tr')
                    $('#trHeader').after(tableRows)

                }

            })

        } else {
            var query = $('#searchInputCompany').val().toLowerCase().trim();
            var companyProperty = $('#companyProperty').val();
            var limit = $('#ajaxPageLimitCompany').val();

            $.ajax({
                url: $('#uri_hiddenSearchCompany').val().trim(), // separate file for search
                data: {
                    'query': query,
                    'companyProperty': companyProperty,
                    'limit': limit,
                    'currentPage': 1
                },
                method: 'POST',

                success: function (response) {
                    $('.tr').remove()
                    var tableRows = $(response).find('.tr')
                    $('#ajaxPageLimitCompany option').show();
                    $('#ajaxPageLimitCompany option:selected').hide();
                    $('#trHeader').after(tableRows)
                    $('#paginationContainer').remove()
                    $('#currentLimit').val(val)
                    $('#currentLimit').text(val)
                    var pagination = $(response).find('#paginationContainer')
                    $('#table').after(pagination)

                },
                error: function () {
                    alert("something has gone wrong");
                }
            });
        }

    });



    var $input = $('#newCompany  :input:text')
    $submit = $('#submitCompany');
    $submit.attr('disabled', true);

    $input.keyup(function () {
        var trigger = false;
        $input.each(function () {
            if (!$(this).val()) {
                trigger = true;
            }
        });
        trigger ? $submit.attr('disabled', true) : $submit.removeAttr('disabled');
    });

  
   
    
        $('#myTable ').on('change', function(){
            $(this).each(function(){
           
            $('.companiesToDeleteCheckbox:checkbox:checked').length > 0 ? $('#deleteCompanies').fadeIn() : $('#deleteCompanies').fadeOut()
                 
        })
    })

})










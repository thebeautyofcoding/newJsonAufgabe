// hide elements that don't contain the search keyword
// $(document).ready(function(){
//     $("#searchInput").on("keyup", function() {
//       var value = $(this).val().toLowerCase();

//         $("#myTable .tr").filter(function() {



//             $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)


//         });
//         if($(".tr").text().toLowerCase().indexOf(value)===-1){
//             $('.btn-danger').hide()
//             $('.pagination').hide()


//         }else{
//             $('.btn-danger').show()
//             $('.pagination').show()
//         }
//     });


// If person's property chosen, search input enabled
//If search input contains something -> post request via ajax to ajaxSearchAction with query, personProperty, limit, currentPage
// @success: each table row is removed, pagination container is removed, new table rows from ajax response are inserted after the trHeader element, also the pagination container is taken from the ajax response and inserted after the table element
$(document).ready(function () {
    $('#searchInput').prop('disabled', 'disabled')
    $('#personProperty').change(function () {

        if ($(this).val() !== '') {
            $('#searchInput').prop('disabled', false)
        } else {
            $('#searchInput').prop('disabled', true)
        }
        if ($('#searchInput').val() !== '') {
            var query = $('#searchInput').val().toLowerCase().trim();
            var personProperty = $(this).val();
            var limit = $('#ajaxPageLimit').val();

            $.ajax({
                url: $('#uri_hiddenSearch').val().trim(),
                data: {
                    'query': query,
                    'personProperty': personProperty,
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


    $("#searchInput").on("keyup", function () {

        var query = $(this).val().toLowerCase().trim();
        var personProperty = $('#personProperty').val();
        var limit = $('#ajaxPageLimit').val();
        console.log(limit)
        $.ajax({
            url: $('#uri_hiddenSearch').val().trim(), // separate file for search
            data: {
                'query': query,
                'personProperty': personProperty,
                'limit': limit,
                'currentPage': 1
            },
            method: 'POST',

            success: function (response) {
                $(' .tr').remove()
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


    // Disable CreateNew-Button, if no Company was chosen
    $('#submitPerson').prop('disabled', true)
    $('#select').on('change', function () {

        if ($('#select').val() !== '' && $('input:text').val() !== '') {
            $('#submitPerson').prop('disabled', false)
        } else {
            $('#submitPerson').prop('disabled', true)
        }
    })

    $('#newPerson  :input:text').on('change', function () {

        if ($('#newPerson  :input:text').val() !== '' && $('#select').val() !== '') {
            $('#submitPerson').prop('disabled', false)
        } else {
            $('#submitPerson').prop('disabled', true)
        }
    })



    $(this).on('click', ':button.personPageButton, :button#nextButton, :button#previousButton', function () {

        var currentPageNumber = $(this).val();

        var controllerpath = $("#uri_hidden").val();
        var ajaxPageLimit = $('#ajaxPageLimit').val()
        if ($('#personProperty').val() === '' && $('#searchInput').val() === '') {


            $.ajax({
                type: "POST",
                url: controllerpath,



                data: { 'pageNumber': currentPageNumber, 'ajaxPageLimit': ajaxPageLimit },
                success: function (response) {
                    console.log(response)
                    $('.tr').each(function () {
                        $(this).remove()
                    })

                    $('#currentLimit').val(ajaxPageLimit)
                    $('#currentLimit').text(ajaxPageLimit)


                    var template = `{{#persons}}
                   <tr>
           
                           <td>
           
                            <input id="anrede" type="text" disabled="true"value="{{anrede}}" class="form-control"></input>
           
                           
                                
                           </td>
                           <td>
           
                           <input  id="vorname" type="text" disabled="true" value="{{vorname}}" class="form-control"></input>
           
                           
                                
                           </td>
                           <td>
           
                           <input id="nachname" type="text" disabled="true" value="{{nachname}}" class="form-control"></input>
           
                           
                                
                           </td>
                           <td>
           
                           <input type="text" id="email" disabled="true" value="{{email}}" class="form-control"></input>
           
                           
                                
                           </td>
                           <td>
           
                           <input type="text" id="telefon" disabled="true" value="{{telefon}}" class="form-control"></input>
           
                           
                                
                           </td>
                           <td>
           
                           <input type="text" id="handy" disabled="true" value="{{handy}}" class="form-control"></input>
           
                           
                                
                           </td>
                           <td>
                            
                          <a class="firma" href="#">{{firma}}</a>
           
                          <div id="selectCompany"></div>
                                
                           </td>
                           <td>
           
                           <button class="btn btn-primary editButton" value={{uid}} type="button" >
                           Updaten
                           </button>
                           
                    
                           
                                
                           </td>
                           <td>
           
                           <input type="checkbox" ">
           
                           
                                
                           </td>
                 
           
                   </tr>
           
           {{/persons}}`

                    // persons = {}
                    // persons.person=[]

                    var personList = []
                    // var person= new Object()
                    response.persons.map(function (curr) {

                        personList.push(curr)

                    })
                    // var persons=JSON.stringify(persons)
                    // persons={persons:persons}
                    var html = Mustache.render(template, { persons: personList })



                    $('#trHeader').after(html)










                }
            })

        } else {
            var controllerpath = $("#uri_hiddenSearch").val();
            var limit = $("#ajaxPageLimit").val();
            var query = $("#searchInput").val();
            var currentPageNumber = $(this).val();
            var personProperty = $('#personProperty').val()

            $.ajax({
                type: "POST",
                url: controllerpath,
                data: { 'currentPage': currentPageNumber, 'limit': limit, 'query': query, 'personProperty': personProperty },
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



    $(document).on('click', '.editButton', function () {
        var personToEdit = $(this).next().val();
        controllerpath = $('.uri_hiddenUpdate').val()

        $(this).toggleClass('letsUpdate btn-success')
        console.log($(this))
        if ($(this).hasClass('letsUpdate')) {
            $(this).text('Bestätige!')
            $(this).parents('tr').find("td").find(".personProperty").prop('disabled', false)

            $(this).parents().find('.firma').hide()
            controllerPath = $('.uri_hiddenAllCompanies').val()
            $.ajax({
                type: "POST",
                url: controllerPath,

                success: function (response) {

                    console.log(response)



                    var selectTemplate =
                        ` <select name="companies" class="form-control"id="companies">
                        {{#companies}}
                        <option value={{uid}}>{{name}}</option>
                
                        {{/companies}}
                    </select>`

console.log(this)
                    var html = Mustache.render(selectTemplate, { companies: response })
                    $(this).parents().find('td'). find('.firma').append(html)
                }
            })
        } else {
            $('.firma').show()
            $(this).parents('tr').find("td").find(".personProperty").prop('disabled', true)
            $(this).text('Updaten')
            $('#companies').hide()

            $.ajax({
                type: "POST",
                url: controllerpath,
                data: {
                    'tx_heiner_persons': {
                        anrede: $('#anrede').val(),
                        vorname: $('#vorname').val(),
                        nachname: $('#nachname').val(),
                        email: $('#email').val(),
                        telefon: $('#telefon').val(),
                        handy: $('#handy').val(),
                        firma: $('#companies').val(),
                        uid: personToEdit

                    }
                },
                success: function (response) {


                }
            })

        }






    })
    $('#ajaxPageLimit').change(function () {

        var val = $('#ajaxPageLimit').val();

        var personProperty = $('#personProperty').val();
        var searchInput = $('#searchInput').val();


        const pageNumber = $('.page-item.disabled').find('#pageButton').val()

        var controllerpath = $("#uri_hidden").val();
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

                    $('#ajaxPageLimit option').show();
                    $('#ajaxPageLimit option:selected').hide();

                    var tableRows = $(response).find('.tr')
                    $('#trHeader').after(tableRows)

                }

            })

        } else {
            var val = $('#ajaxPageLimit').val();

            var query = $('#searchInput').val().toLowerCase().trim();
            var personProperty = $('#personProperty').val();
            var limit = $('#ajaxPageLimit').val();
            console.log(limit)
            $.ajax({
                url: $('#uri_hiddenSearch').val().trim(), // separate file for search
                data: {
                    'query': query,
                    'personProperty': personProperty,
                    'limit': limit,
                    'currentPage': 1
                },
                method: 'POST',

                success: function (response) {
                    $('.tr').remove()
                    var tableRows = $(response).find('.tr')
                    $('#ajaxPageLimit option').show();
                    $('#ajaxPageLimit option:selected').hide();
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

    })



    $('#myTable').on('change', function () {

        $(this).each(function () {

            $('.personsToDeleteCheckbox:checkbox:checked').length > 0 ? $('#deletePersons').fadeIn() : $('#deletePersons').fadeOut()

        })
    })

})


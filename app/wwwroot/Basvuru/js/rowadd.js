$(document).ready(function () {
    $('#a').attr('disabled', false);
    let a;
    let i;
    let TownId;
    let ProvinceId;
    let getEmployeeId
    window.onload = function () {
        a = 0;
        i = 1;
        var ProvinceId = 0;
        var TownId = 0;
        var getEmployeeId = 0;

    };




    $('#a').change(function () {

        var provinceId = $(this).val();

    });
    document.getElementById('rowadd').addEventListener('click', c);

    $('#rowadd').click(function () {



        var newRow = `  <tr>
                            <td>
                                    <input type="date" name=AppealDate  id=AppealDate` + a + ` >

                                        </td>
                                          <td>
                                       <select class="form-control" name=sayi  id=sayi` + a + `> </select>
                                       <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                                       <script src="~/Basvuru/js/DropD.js"></script>
                                       <div class="form-group">
                                        <label class="col-md-4 control-label">İl</label>
                                        <div class="col-md-6">

                                        </div>
                                      </div>
                                   </td>
                                       <td>
                                    <input type="checkbox" name=NoTravelRestrictions  id=NoTravelRestrictions` + a + ` value="true"   >
                                    
                                    <b>Engel Yok</b>
                                   </td>
                                    <td><input type="text" name=WorkPlace  id=WorkPlace` + a + ` ></td>
                                <td><input type="text" name=Job   id=Job` + a + `   ></td>
                                <td><input type="text" name=Note maxlength="100"  id=Note` + a + ` ></td>
                                <td></td>
                            </tr>
                                
        `;

        $('#table tbody').append(newRow);



        var rows = [];
        $('#table tbody tr').each(function () {



        });



        LoadProvinces2()

        t4()
        

    });



    
  
    function LoadProvinces2() {
        $('#sayi' + a).empty();
        $.ajax({
            url: '/DropD/GetProvince',
            type: 'GET',
            success: function (response) {
                if (response && response.length > 0) {

                    $('#sayi' + a).attr('disabled', false);
                    $('#sayi' + a).append('<option>-- İl Seçiniz --</option>');

                    $('#sayi' + a).change(function () {
                        ProvinceId = $(this).val();
                        console.log($('#sayi' + a));
                    });

                    $.each(response, function (i, data) {

                        $('#sayi' + a).append('<option value="' + data.provinceId + '">' + data.provinceName + '</option>');

                    });
                } else {
                    $('#sayi' + a).attr('disabled', true);

                    $('#sayi' + a).append('<option>-- İl mevcut değil --</option>');

                }
            },
            error: function (error) {
                alert('Bir hata oluştu: ' + error.responseText)
            }

        });
    }



    function c() {
        if (ProvinceId > 0) {

            a = a + 1
        }

    };


    function t4() {

        if (ProvinceId > 0) {
            console.log(a);
            a = a - 1;
            console.log(a);
            var checkbox = $(`#NoTravelRestrictions` + a);

            function updateCheckboxValue() {
                if (checkbox.is(':checked')) {
                    checkbox.val('false');

                } else {
                    checkbox.val('true');

                }
            }
            updateCheckboxValue();

            function GetEmployeeId(FullName) {

                $.ajax({
                    url: '/Dropdown/GetEmployeeId',
                    type: 'GET',
                    data: {
                        FullName: FullName
                    },
                    success: function (response) {
                        if (response.success !== false) {

                            /* var employeeId = response.getEmployeeId;*/
                            console.log('EmployeeId:', employeeId);

                        } else {
                            console.log('EmployeeId:', employeeId);
                            alert(response.message);
                        }
                    },
                    error: function () {
                        
                    }
                });

            }

                $.ajax({
                    url: '/Dropdown/Create2',
                    type: 'POST',
                   
                    data: {

                        AppealDate: $(`#AppealDate` + a).val(),
                        ProvinceId: $(`#sayi` + a).val(),
                        NoTravelRestrictions: checkbox.val(),
                        WorkPlace: $(`#WorkPlace` + a).val(),
                        Job: $(`#Job` + a).val(),
                        Note: $(`#Note` + a).val()




                    },
                    success: function (response) {
                        if (response.success) {
                            alert("WorkAppeal created successfully!");

                        } else {
                           /* alert("Failed to create product.");*/
                        }
                    },
                    error: function () {
                       
                    }
                });

            a = a + 1;

        }
        else {                 
            $.ajax({
                data: {

                    FullName: $("#FullName").val(),
                    ProvinceId: ($("#Province").val()),
                    TownId: ($("#Town").val()),
                    Gender: $("input[name='Gender']:checked").val(),
                    BirthDate: $("#BirthDate").val(),
                    Note: $("#Note").val(),



                },
                
                url: '/Dropdown/Action',
                type: 'POST',

          
                success: function (response) {

                    if (response.success) {
                        alert("Product created successfully!");
                       
                    } else {
                       /* alert("Failed to create product.");*/
                    }
                },

                error: function (response) {
                   
                }
            });

         
            


            
        }
    }
})
















//// Event delegation for removing rows
//$('#dataTable').on('click', '.removeRowButton', function () {
//    $(this).closest('tr').remove();
//});



$(document).ready(function () {
    
    LoadProvinces();
    let townId;
    let provinceId;
    let TownIdDD;
    let ProvinceIdDD;
    $('#Province').change(function () {


        var provinceId = $(this).val();
        ProvinceIdDD = provinceId;
 

    });



});

function LoadProvinces() {
    $('#Province').empty();
    $.ajax({
        url: '/Dropdown/GetProvince',
        type: 'GET',
        success: function (response) {
            if (response && response.length > 0) {
             
                $('#townId').remove();
                $('#Province').attr('disabled', false);
                $('#Province').append('<option>-- İl Seçiniz --</option>');

                $('#Province').change(function () {

                    var provinceId = $(this).val();
                    if (provinceId) {

                        var optionCount = $('#Town option').length;
                        if (optionCount === 0) {

                            $('#Town').attr('disabled', false);
                            LoadTowns(provinceId);
                            console.log(response)

                        } else {


                            $('#Town').empty();

                            $('#Town').attr('disabled', false);
                            LoadTowns(provinceId);
                            console.log(response)

                        }
                    }
                    else {
                        
                        $('#Town').empty();

                        $('#Town').attr('disabled', true);
                    }
                   
                    ProvinceIdDD = provinceId
                });

                $.each(response, function (i, data) {
                 

                    $('#Province').append('<option value="' + data.provinceId + '">' + data.provinceName + '</option>');

                    ProvinceIdDD = data.provinceId


                });

            } else {
                $('#Province').attr('disabled', true);
                $('#Town').attr('disabled', true);
                $('#Province').append('<option>-- İl mevcut değil --</option>');
                $('#Town').append('<option>-- İlçe mevcut değil --</option>');
            }
        },
        error: function (error) {
            alert('Bir hata oluştu: ' + error.responseText)
        }

    });
}


function LoadTowns(provinceId) {

    $('#town').empty();
    $.ajax({
        url: '/Dropdown/GetTown',
        type: 'GET',
        data: { provinceId },
        success: function (response) {
            if (response && response.length > 0) {
                console.log(response);

                $('#Town').attr('disabled', false);

        
               
                $('#Town').change(function () {

                    var townId = $(this).val();
                    TownIdDD = townId;
                  
                });
                $.each(response, function (i, data) {

                    
                    $('#Town').append('<option value="' + data.townId + '">' + data.townName + '</option>');
                    TownIdDD = data.townId;
                   
                });
            } else {
                console.log(response);
                $('#Town').attr('disabled', true);
                $('#Town').append('<option>-- İlçe mevcut değil --</option>');
            }

        },
        error: function (error) {
            alert('Bir hata oluştu: ' + error.responseText);
        }

    });


}












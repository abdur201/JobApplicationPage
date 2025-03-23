$(document).ready(function () {
    LoadProvincesEdit();
    let provinceIda;
    let townIda;
    // Eğer düzenleme moduna geçiş yapıldıysa, mevcut değerleri ayarla
    const initialProvinceId = $('#editProvince').data('selected-id'); // Düzenle butonuna tıklanınca set edilecek
    const initialTownId = $('#editTown').data('selected-id'); // Düzenle butonuna tıklanınca set edilecek

    if (initialProvinceId) {
        $('#editProvince').val(initialProvinceId).trigger('change');
    }

    if (initialTownId) {
        $('#editTown').val(initialTownId);
    }
    debugger;
    provinceIda = $('#editProvince').val();
    townIda = $('#editTown').val();

    // Burada il ve ilçe bilgilerini veri kaynağından alıp set etmeniz gerekiyor
    // Örnek olarak veri seti (sadece demo amaçlı)
    $('#editProvince').data('selected-id', provinceIda); // İl id'si
    $('#editTown').data('selected-id', townIda); // İlçe id'si

    // Formu güncelle
    LoadProvincesEdit();

});

$('#editProvince').click(function () {
    var provinceId = $(this).val();
    if (provinceId) {
        $('#editTown').attr('disabled', false);
        LoadTownsEdit(provinceId);
    } else {
        $('#editTown').attr('disabled', true).empty();
    }
});

function LoadProvincesEdit() {
    $('#editProvince').empty().append('<option>-- İl Seçiniz --</option>');

    $('#editProvince').empty();
    $.ajax({
        url: '/Dropdown/GetProvince',
        type: 'GET',
        success: function (response) {
            if (response && response.length > 0) {

                $('#editTownId').remove();
                $('#editProvince').attr('disabled', false);
                $('#editProvince').append('<option>-- İl Seçiniz --</option>');

                $('#editProvince').change(function () {

                    var provinceId = $(this).val();
                    if (provinceId) {

                        var optionCount = $('#editTown option').length;
                        if (optionCount === 0) {

                            $('#editTown').attr('disabled', false);
                            LoadTowns(provinceId);
                            console.log(response)

                        } else {


                            $('#editTown').empty();

                            $('#editTown').attr('disabled', false);
                            LoadTowns(provinceId);
                            console.log(response)

                        }
                    }
                    else {

                        $('#editTown').empty();

                        $('#editTown').attr('disabled', true);
                    }

                    ProvinceIdDD = provinceId
                });

                $.each(response, function (i, data) {


                    $('#editProvince').append('<option value="' + data.provinceId + '">' + data.provinceName + '</option>');

                    ProvinceIdDD = data.provinceId


                });

            } else {
                $('#editProvince').attr('disabled', true);
                $('#editTown').attr('disabled', true);
                $('#editProvince').append('<option>-- İl mevcut değil --</option>');
                $('#editTown').append('<option>-- İlçe mevcut değil --</option>');
            }
        },
        error: function (error) {
            alert('Bir hata oluştu: ' + error.responseText)
        }

    });
}

function LoadTownsEdit(provinceId) {
    $('#editTown').empty().append('<option>-- İlçeleri yükleniyor --</option>');

    $.ajax({
        url: '/Update/GetTown',
        type: 'GET',
        data: { provinceId: provinceId },
        success: function (response) {
            if (response && response.length > 0) {
                $.each(response, function (i, data) {
                    $('#editTown').append('<option value="' + data.townId + '">' + data.townName + '</option>');
                });

                // Düzenleme yaparken seçili olan ilçe id'sini ayarla
                const initialTownId = $('#editTown').data('selected-id');
                if (initialTownId) {
                    $('#editTown').val(initialTownId);
                }
            } else {
                $('#editTown').append('<option>-- İlçe mevcut değil --</option>').attr('disabled', false);
               
            }
        },
        error: function (error) {
            alert('Bir hata oluştu: ' + error.responseText);
        }
    });
}

// Düzenle butonuna tıklanınca formu doldur
$('#editButton').click(function () {
    debugger;
    provinceIda= $('#editProvince').val();
    townIda= $('#editTown').val();
   
    // Burada il ve ilçe bilgilerini veri kaynağından alıp set etmeniz gerekiyor
    // Örnek olarak veri seti (sadece demo amaçlı)
    $('#editProvince').data('selected-id', provinceIda); // İl id'si
    $('#editTown').data('selected-id', townIda); // İlçe id'si

    // Formu güncelle
    LoadProvincesEdit();
});

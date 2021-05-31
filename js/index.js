const generalData = new GeneralData();
const seeker = new Seeker();
const pager = new Pager('propertyList','nextPage','previousPage','pagerInfo', true);
const pager2 = new Pager('propertyList2','nextPage2','previousPage2','pagerInfo2', false);
const phpApi = new PhpApi();
/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function (callback, timeout) {
  $(this).scroll(function () {
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback, timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider() {
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll() {
  var ultimoScroll = 0,
    intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event) => {
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll) {

      } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
      }
      ultimoScroll = scrollActual;
    })
    .scrollEnd(() => {
      video.pause();
    }, 10)
}

/**
 * Carga los valores de los filtros de ciudad y tipo
 */
function loadSeeker() {
  generalData.cities.forEach(element => {
    $('#selectCiudad').append('<option value="' + element + '">' + element + '</option>');
  });
  generalData.types.forEach(element => {
    $('#selectTipo').append('<option value="' + element + '">' + element + '</option>');
  });
}

$('#submitButton').on('click', function () {
  pager.constructPager(seeker.searchData(), true, true);
});

$("[href='#tabs-2']").on('click', function () {
  phpApi.read(function (data) {
    const properties = [];
    data.data.objects.forEach(element => {
      var data = generalData.getById(parseInt(element.ID));
      var property = new Propertie(
        data.Id,
        data.Direccion,
        data.Ciudad,
        data.Telefono,
        data.Codigo_Postal,
        data.Tipo,
        data.Precio
      );
      properties.push(property);
    });
    pager2.constructPager(properties, true, false);
  });
});

inicializarSlider();
// playVideoOnScroll();
loadSeeker();
$('#submitButton').click();

$(document).ready(function(){

  /* ========== Carga de Pokemon en Select ========== */
  $.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0",
    type: 'GET',
    dataType: 'JSON',
    success: function(data) {
      var poke_name = data.results;
      var poke_nombre = [];

      for(let i = 0; i < poke_name.length; i++){
        poke_nombre[i] = poke_name[i].name.toUpperCase()
        
        $('#select_poke').append('<option value="' + parseInt(parseInt(i) + 1) +'">' + poke_nombre[i] + '</option>');
      }
    },
  });
  /* ========== Carga de Pokemon en Select ========== */



  $('select#select_poke').on('click', function(v){
    if (v.target.value != '0'){
      var poke_number = v.target.value
    }

    $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/" + poke_number,
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        var poke_img_name = data.name.toUpperCase();
        
        /* ====== Carga de Imágenes de Pokemon ====== */
        var poke_sprite_front = data.sprites.front_default;
        var poke_sprite_back = data.sprites.back_default;
        $('#poke-name').html(poke_img_name)
        $('#poke-front').html('<img src="' + poke_sprite_front + '">' + '<p>Vista Frontal</p>')
        $('#poke-back').html('<img src="' + poke_sprite_back + '">' + '<p>Vista Trasera</p>')
        /* ====== Carga de Imágenes de Pokemon ====== */
        

        /* ======= Carga de Datos de Pokemon ======= */
        var poke_id = data.id;
        $('#poke-id').html(poke_id);

        var poke_type = data.types[0].type.name;
        if (poke_type == 'fire'){
          poke_type = 'Fuego';
          $('span#poke-type').removeClass().addClass('red');
        } else if (poke_type == 'poison'){
          poke_type = 'Veneno';
          $('span#poke-type').removeClass().addClass('purple');
        } else if (poke_type == 'water'){
          poke_type = 'Agua';
          $('span#poke-type').removeClass().addClass('blue');
        } else if (poke_type == 'bug'){
          poke_type = 'Insecto';
          $('span#poke-type').removeClass().addClass('green-bug');
        } else if (poke_type == 'flying'){
          poke_type = 'Volador';
          $('span#poke-type').removeClass().addClass('blue-fly');
        } else if (poke_type == 'normal'){
          poke_type = 'Normal';
          $('span#poke-type').removeClass().addClass('normal');
        } else if (poke_type == 'electric'){
          poke_type = 'Eléctrico';
          $('span#poke-type').removeClass().addClass('yellow');
        } else if (poke_type == 'ground'){
          poke_type = 'Tierra';
          $('span#poke-type').removeClass().addClass('brown');
        } else if (poke_type == 'rock'){
          poke_type = 'Roca';
          $('span#poke-type').removeClass().addClass('roca');
        } else if (poke_type == 'psychic'){
          poke_type = 'Psíquico';
          $('span#poke-type').removeClass().addClass('fucsia');
        } else if (poke_type == 'fairy'){
          poke_type = 'Hada';
          $('span#poke-type').removeClass().addClass('hada');
        } else if (poke_type == 'dragon'){
          poke_type = 'Dragón';
          $('span#poke-type').removeClass().addClass('dragon');
        } else if (poke_type == 'steel'){
          poke_type = 'Acero';
          $('span#poke-type').removeClass().addClass('steel');
        } else if (poke_type == 'ice'){
          poke_type = 'Hielo';
          $('span#poke-type').removeClass().addClass('blue-fly');
        } else if (poke_type == 'fighting'){
          poke_type = 'Lucha';
          $('span#poke-type').removeClass().addClass('brown');
        }
        $('#poke-type').html(poke_type);
        /* ======= Carga de Datos de Pokemon ======= */
      
        
        var poke_stats_hp = data.stats[5].base_stat;
        var poke_stats_attack = data.stats[4].base_stat;
        var poke_stats_def = data.stats[3].base_stat;
        var poke_stats_spat = data.stats[2].base_stat;
        var poke_stats_spdef = data.stats[1].base_stat;
        var poke_stats_speed = data.stats[0].base_stat;
        
        $('#poke-stats-hp').html(poke_stats_hp);
        $('#poke-stats-attack').html(poke_stats_attack);
        $('#poke-stats-def').html(poke_stats_def);
        $('#poke-stats-spatt').html(poke_stats_spat);
        $('#poke-stats-spdef').html(poke_stats_spdef);
        $('#poke-stats-speed').html(poke_stats_speed);

        var poke_stats_value = [
          poke_stats_hp,
          poke_stats_attack,
          poke_stats_def,
          poke_stats_spat,
          poke_stats_spdef,
          poke_stats_speed
        ];
        var poke_stats_name = [
          'Salud',
          'Ataque',
          'Defensa',
          'Ataque Especial',
          'Defensa Especial',
          'Velocidad'
        ];

        var poke_name = data.name.toUpperCase();

        /* Chart JS */
        var ctx = document.querySelector('#poke-graph');

        var pokeGraph = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: poke_stats_name,
            datasets: [{
              data: poke_stats_value,
              label: poke_name,
              backgroundColor: 'rgba(239, 83, 80, 0.25)',
              borderColor: 'rgba(239, 83, 80, 0.5)',
            }]
          },
          options: {
            scale: {
              ticks: {
                  suggestedMin: 0,
                  suggestedMax: 200
              }
          }
          }
        });


      }
    });
    $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon-species/" + poke_number,
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        var poke_habitat = data.habitat.name;

        if ( poke_habitat == 'grassland' ) {
          poke_habitat = 'Pradera';
          $('span#poke-habitat').removeClass().addClass('green');
        } else if ( poke_habitat == 'mountain' ) {
          poke_habitat = 'Montaña';
          $('span#poke-habitat').removeClass().addClass('steel');
        } else if (poke_habitat == 'forest'){
          poke_habitat = 'Bosque';
          $('span#poke-habitat').removeClass().addClass('green-bug');
        } else if (poke_habitat == 'urban'){
          poke_habitat = 'Ciudad';
          $('span#poke-habitat').removeClass().addClass('dragon');
        } else if (poke_habitat == 'cave'){
          poke_habitat = 'Cueva';
          $('span#poke-habitat').removeClass().addClass('brown');
        } else if (poke_habitat == 'waters-edge'){
          poke_habitat = 'Orilla del Agua';
          $('span#poke-habitat').removeClass().addClass('blue');
        } else if (poke_habitat == 'rare'){
          poke_habitat = 'Raro';
          $('span#poke-habitat').removeClass().addClass('hada');
        } else if (poke_habitat == 'sea'){
          poke_habitat = 'Mar';
          $('span#poke-habitat').removeClass().addClass('blue');
        } else if (poke_habitat == 'rough-terrain'){
          poke_habitat = 'Terreno Agreste';
          $('span#poke-habitat').removeClass().addClass('brown');
        }
        $('#poke-habitat').html(poke_habitat);
      }
    });


  });



});
$(document).ready(function(){
   var cala;
   var isSortedAscending;
   
   $.ajax({
        type: 'GET',
        url: 'https://jsonplaceholder.typicode.com/posts',
        dataType: 'jsonp',
        success: function(odpowiedz){
            cala=odpowiedz;
            isSortedAscending = true;
            reload();
        }
      });
      
      $('#sort > tr > th').click(function(){
        if(isSortedAscending){
            cala =  _.orderBy(cala, ['id'],['desc']);
            reload();
            isSortedAscending=false;
        }
        else{
            cala =  _.orderBy(cala, ['id'],['asc']);
            reload();
            isSortedAscending=true; 
        }
      })

    function reload(){  
        $('#tabela > tr').remove();
        for(i=0; i<cala.length; i++){
            var row = document.createElement('tr');
            $('#tabela').append(row);

            var col1 = document.createElement('td');
            var col2 = document.createElement('td');
            var col3 = document.createElement('td');
            var col4 = document.createElement('td');
            var col5 = document.createElement('td');
            var remove = document.createElement('button');
            remove.innerHTML = 'usuń';
            remove.onclick = usun;

            var edit = document.createElement('button');
            edit.innerHTML = 'Edytuj';
            edit.onclick = edytuj;

            row.append(col1);
            row.append(col2);
            row.append(col3);
            row.append(col4);
            row.append(col5);

            col1.append(cala[i]['userId']);
            col2.append(cala[i]['id']);
            col3.append(cala[i]['title']);
            col4.append(cala[i]['body']);
            col5.append(remove , edit);
        }
    }
    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#mainTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });

      $('#add').on('click', function(){
            $('#tabela').append('<tr><td>11</td><td></td><td></td><td>Dodano nowy wiersz</td></tr>')
      })

      function usun(event) {
        var row = event.target.parentElement.parentElement;
        row.parentElement.removeChild(row);
      }

      function edytuj(event){
        var td = event.target.parentElement.parentElement.children[3];
        var value = td.innerHTML;
        td.innerHTML = '';
        var input = document.createElement('input');
        var save = document.createElement('button');
        save.innerHTML = 'Zapisz';
        save.onclick = zapisz;
        td.append(input,save);
      }

      function zapisz(event){
        var input = event.target.parentElement.children[0];
        var value = input.value;
        input.parentElement.removeChild(input);
        event.target.parentElement.parentElement.children[3].innerHTML = value;
    }
    })

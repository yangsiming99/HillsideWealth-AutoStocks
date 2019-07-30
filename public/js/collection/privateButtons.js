var update_counter = 0;
var to_update = [];
/**
 * Opens a sweetalert and adds all stocks user inputs
 */
function add(){
    let stocks;
    Swal.fire({
        title: 'Add Stocks',
        text: 'Formats: American Stocks: [SYMBOL], Canadian stocks: [EXCHANGE:SYMBOL]',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Add Stocks',
        preConfirm: (result) => {
            let stockstring = result.replace(/\s/g, "");
            stocks = stockstring.split(',');
        }
    }).then((result) => {
        if(!result.dismiss){
            Swal.fire({
            type: 'success',
            title: 'Currently Saving To Database!',
            showConfirmButton: false
        });
        adder_ajax(0, stocks.length, stocks, '/append');
        }
    });
}

/**
 * Selected stocks get removed from the database
 */
function remove(){
    let to_remove = [];
    let selected = $table.rows('.selected').data();
    for(let  i in selected ){
        if(selected[i].symbol){
        to_remove.push(selected[i].symbol);
        }   
        else{
            break;
        }
    }
    ajax_Call(to_remove, '/remove').then((resolved) => {
            for(let i in to_remove){
                $table.row(document.getElementById(`${to_remove[i]}`)).remove().draw();
            }
    });
}

/**
 * Updates All selected stocks
 * @param {String} link 
 */
function update(link){
    to_update = [];
    to_stock_id = [];
    let selected = $table.rows('.selected').data();
    for(let i in selected ){
        if(selected[i].symbol){
        to_update.push(selected[i].symbol);
        to_stock_id.push(selected[i].stock_id);
        }   
        else{
            break;
        }
    }

    Swal.fire({
        position:'center',
        type: 'question',
        title: 'The selected stocks are currently being updated!',
        text: `Progress: ${update_counter}/${to_update.length}`,
        footer: 'This might take a while, you might want to do something else',
        showConfirmButton: false,
    });
    counter_ajax(0, to_update.length, to_update, to_stock_id, link);
}
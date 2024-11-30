$(document).on("submit", "#exportar_excel", function(event) {
            event.preventDefault();
            console.log("entro a exportar_excel")
            var anio = $("#anio_cobranza").val();//.toString();
            var mes = $("#mes_cobranza").val();//.toString();
            var user_id = $("#users_cobranza").val();
            

            const params_cobranza_excel = {
                anio: anio, // Convertir a texto
                mes: mes, // Convertir a texto
                usuario : user_id
            };

            var BACKEND_EXPORTS_COBRANZAS_2= 'http://localhost:5000/'+'cliente/getMovistar';

            console.warn(params_cobranza_excel)
            $('#loading_cobranzas_excel').show();
            $('#botonSubmit').prop("disabled", true);

            fetch(BACKEND_EXPORTS_COBRANZAS_2, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params_cobranza_excel)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
                $('#botonSubmit').prop("disabled", false);
            })
            .then(data => {
                console.log("La exportacion de cobranzas excel");
                console.log(data);
                if (data.body) {
                    const timestamp = new Date().toISOString().replace(/[-:.]/g,
                        ""); // Formato YYYYMMDDHHMMSS
                    const filename =
                        `exportable-cobranzas-excel_${timestamp}.xlsx`; // Nombre del archivo con timestamp
                    const link = document.createElement('a');
                    link.href = `data:application/octet-stream;base64,${data.body}`;
                    link.download = filename; // Usa el nuevo nombre con timestamp
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    $('#botonSubmit').prop("disabled", false);
                    //$("#ModalCobranzaExcelGeneral").modal("hide");
                }
                $('#botonSubmit').prop("disabled", false);
            })
            .catch(error => {
                console.error('Error:', error);
                $('#botonSubmit').prop("disabled", false);
            })
            .finally(() => {
                // Ocultar el spinner
                $('#loading_cobranzas_excel').hide();
                $('#botonSubmit').prop("disabled", false);
                $("#ModalCobranzaExcel").modal("hide");
            });

        });
<?php
Controller Excel 

public function DescargarCobranzaDashExcelGeneral(Request $request)
    {
        ini_set('memory_limit', '-1');

        $dataFechas = [
            'anio' => intval($request->anio),
            'mes' => intval($request->mes),
            'usuario' => auth()->user()->id
        ];

        $dt = json_encode($dataFechas);

        $url_backend = env('BACKEND_EXPORTS', 'https://localhost:5000/') . 'Cliente/getMovistar';
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $url_backend,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POSTFIELDS => $dt,
            CURLOPT_HTTPHEADER => array('Content-Type: application/json')
        ));

        $response = curl_exec($curl);

        if (curl_errno($curl)) {
            echo 'Error en la solicitud cURL: ' . curl_error($curl);
            curl_close($curl);
            exit;
        }

        curl_close($curl);

        $base64 = json_decode($response, true)['data'] ?? null;
        
        if ($base64) {
            $data = base64_decode($base64);
        
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="exportable_movistar.xlsx"');
            header('Content-Length: ' . strlen($data));
        
            echo $data;
        } else {
            echo 'Invalid or missing base64 data in the response';
        }

        //$this->renderExcel();

        /*return (new PlantillaDashboardExcelCobranzaGeneral(
            $request->mes,
            $request->anio
        ))
            ->download('Dashboard cobranza general ' . $request->mes . "_" . $request->anio . '.xlsx');*/
    }
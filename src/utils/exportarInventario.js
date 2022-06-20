import JovemService from '../services/jovens'
import EmpresaService from '../services/empresas'
import Excel from 'exceljs'
import{ saveAs } from "file-saver";
import Time from './timeConvert'

export async function exportarInventario(){
    
    const jovens = await  JovemService.inventario()
       
    let workbook = new Excel.Workbook();

    workbook.creator = '@sisa';
    workbook.lastModifiedBy = '@sisa';

    workbook.created = new Date(1985, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2016, 9, 27);

    workbook.views = [
    {
            x: 0, y: 0, width: 10000, height: 20000,
            firstSheet: 0, activeTab: 1, visibility: 'visible'
        }
    ]

    const sheet = workbook.addWorksheet('Inventário Ativos');
    
    jovens.data.map((array, i) => {
        jovens.data[i]['DATA DE NASC'] = new Date(array['DATA DE NASC'])
        jovens.data[i]['DATA DE EMISSÃO'] = new Date(array['DATA DE EMISSÃO'])
        jovens.data[i]['ADMISSÃO'] = new Date(array['ADMISSÃO'])
        jovens.data[i]['INICIO EMPRESA'] = new Date(array['INICIO EMPRESA'])
        jovens.data[i]['TÉRMINO EMPRESA'] = new Date(array['TÉRMINO EMPRESA'])
        jovens.data[i]['DEMISSÃO'] = new Date(array['DEMISSÃO'])
        jovens.data[i]['INICIO FÉRIAS'] = new Date(array['INICIO FÉRIAS'])
        jovens.data[i]['FIM FÉRIAS'] = new Date(array['FIM FÉRIAS'])
        jovens.data[i]['EXAME PERIÓDICO'] = new Date(array['EXAME PERIÓDICO'])
        
    })

   
    sheet.columns = [
        { header: "NOME", key: "NOME", width: 50,},
        { header: "SEXO", key: "SEXO", width: 13},
        { header: "MATRICULA", key: "MATRICULA", width: 11},
        { header: "DATA DE NASC", key: "DATA DE NASC", width: 14,style: { numFmt: 'dd/mm/yyyy' }},
        { header: "NATURAL", key: "NATURAL", width: 34},
        { header: "RG", key: "RG", width: 15},
        { header: "DATA DE EMISSÃO", key: "DATA DE EMISSÃO", width: 14,style: {numFmt: 'dd/mm/yyyy'}},
        { header: "CPF", key: "CPF", width: 14},
        { header: "PIS", key: "PIS", width: 14},
        { header: "ENDEREÇO", key: "ENDEREÇO", width: 70},
        { header: "NUMERO", key: "NUMERO", width: 7},
        { header: "BAIRRO", key: "BAIRRO", width: 55},
        { header: "CEP", key: "CEP", width: 10},
        { header: "TELEFONES", key: "TELEFONES", width: 64},
        { header: "EMAIL JOVEM", key: "EMAIL JOVEM", width: 14},
        { header: "EMAIL RESPONSÁVEL", key: "EMAIL RESPONSÁVEL", width: 14},
        { header: "MAE", key: "MAE", width: 50},
        { header: "RG DA MÃE", key: "RG DA MÃE", width: 15},
        { header: "CPF DO MÃE", key: "CPF DO MÃE", width: 14},
        { header: "PAI", key: "PAI", width: 50},
        { header: "RG DO PAI", key: "RG DO PAI", width: 15},
        { header: "CPF DO PAI", key: "CPF DO PAI", width: 14},
        { header: "ESCOLA / ENDEREÇO", key: "ESCOLA / ENDEREÇO", width: 70},
        { header: "ESCOLARIDADE", key: "ESCOLARIDADE", width: 30},
        { header: "R.A", key: "R.A", width: 17},
        { header: "PERIODO", key: "PERIODO", width: 13},
        { header: "I.C", key: "I.C", width: 13},
        { header: "T.S", key: "T.S", width: 13},
        { header: "EMPRESA", key: "EMPRESA", width: 70},
        { header: "ORIENTADOR", key: "ORIENTADOR", width: 30},
        { header: "ENDEREÇO EMPRESA", key: "ENDEREÇO EMPRESA", width: 60},
        { header: "BAIRRO EMPRESA", key: "BAIRRO EMPRESA", width: 35},
        { header: "CEP EMPRESA", key: "CEP EMPRESA", width: 10},
        { header: "TELEFONES EMPRESA", key: "TELEFONES EMPRESA", width: 65},
        { header: "EMAIL EMPRESA", key: "EMAIL EMPRESA", width: 70},
        { header: "CNPJ", key: "CNPJ", width: 18},
        { header: "VR", key: "VR", width: 15},
        { header: "VA", key: "VA", width: 15},
        { header: "VALOR", key: "VALOR", width: 15},
        { header: "VT", key: "VT", width: 15},
        { header: "BILHETE UNICO", key: "BILHETE UNICO", width: 15},
        { header: "ADMISSÃO", key: "ADMISSÃO", width: 15,style: {numFmt: 'dd/mm/yyyy'}},
        { header: "INICIO EMPRESA", key: "INICIO EMPRESA", width: 15,style: {numFmt: 'dd/mm/yyyy'}},
        { header: "TÉRMINO EMPRESA", key: "TÉRMINO EMPRESA", width: 15,style: {numFmt: 'dd/mm/yyyy'}},
        { header: "DEMISSÃO", key: "DEMISSÃO", width: 15,style: {numFmt: 'dd/mm/yyyy'}},
        { header: "FORMAÇÃO INICIAL", key: "FORMAÇÃO INICIAL", width: 30},
        { header: "FORMAÇÃO FINAL", key: "FORMAÇÃO FINAL", width: 30},
        { header: "EXAME PERIÓDICO", key: "EXAME PERIÓDICO", width: 30},
        { header: "CURSO", key: "CURSO", width: 17},
        { header: "SALÁRIO", key: "SALÁRIO", width: 17},
        { header: "CONTRATO", key: "CONTRATO", width: 12},
        { header: "INICIO FÉRIAS", key: "INICIO FÉRIAS", width: 15},
        { header: "FIM FÉRIAS", key: "FIM FÉRIAS", width: 15},
        { header: "DIA DE CURSO", key: "DIA DE CURSO", width: 14},
        { header: "CARGA HORÁRIA", key: "CARGA HORÁRIA", width: 14},
        { header: "JORNADA", key: "JORNADA", width: 14},
        { header: "PCD", key: "PCD", width: 11},
        { header: "TIPO DEFICIÊNCIA", key: "TIPO DEFICIÊNCIA", width: 30},
        { header: "OBS", key: "OBS", width: 70}
            ]

    sheet.addRows(jovens.data);

    workbook.xlsx.writeBuffer()
    .then(buffer => saveAs(new Blob([buffer]), `inventário_${Date.now()}.xlsx`))
    .catch(err => console.log('Error writing excel export', err))
    }


     //CRIAR COLUNAS AUTOMATICAMENTE

    /*
    const header.keys(aprendizes.data[0])
    headers.map((data, i) =>{
        columns.push({
            header: `${data}`,
            key: data,
            width: 10,
            style: data == 'ADMISSÃO' ?{ numFmt: 'dd/mm/yyyy' } : false
        }) 
    })
    sheet.columns = columns;

   //AUTO AJUSTE DA LARGURA DA COLUNO (NÁO FUNCIONOU)

    /*const autoWidth = (worksheet, minimalWidth = 10) =>{
        worksheet.columns.forEach((column) =>{
            let maxColumnLength = 0;
            column.eachCell({ includeEmpty: true }, (cell) =>{
                maxColumnLength = Math.max(
                    maxColumnLength,
                    minimalWidth,
                    cell.value ? cell.value.toString().length : 0
                );
            });
            column.width = maxColumnLength + 2;
        });
    };
    autoWidth(sheet, 10);*/
        
    export async function exportarEmpresas(){
    
        const empresas = await  EmpresaService.invEmpresas();
           
        let workbook = new Excel.Workbook();
    
        workbook.creator = '@sisa';
        workbook.lastModifiedBy = '@sisa';
    
        workbook.created = new Date(1985, 8, 30);
        workbook.modified = new Date();
        workbook.lastPrinted = new Date(2016, 9, 27);
    
        workbook.views = [
        {
                x: 0, y: 0, width: 10000, height: 20000,
                firstSheet: 0, activeTab: 1, visibility: 'visible'
            }
        ]
    
        const sheet = workbook.addWorksheet('Empresas');
        
        sheet.columns = [
            { header: "NOME", key: "NOME", width: 80,},
            { header: "I.C", key: "I.C", width: 13},
            { header: "T.S", key: "T.S", width: 13},
            { header: "CNPJ", key: "CNPJ", width: 20},
            { header: "TELEFONES", key: "TELEFONES", width: 50},
            { header: "RAMAL", key: "RAMAL", width: 13},
            { header: "EMAIL", key: "EMAIL", width: 80},
            { header: "CEP", key: "CEP", width: 14},
            { header: "RUA", key: "RUA", width: 50},
            { header: "BAIRRO", key: "BAIRRO", width: 50},
            { header: "MUNICIPIO", key: "MUNICIPIO", width: 30},
            { header: "UF", key: "UF", width: 13},
            { header: "NUMERO", key: "NUMERO", width: 13},
            { header: "COMPLEMENTO", key: "COMPLEMENTO", width: 13},
            { header: "VR", key: "VR", width: 20},
            { header: "VR VALOR", key: "VR VALOR", width: 13},
            { header: "REFEIÇÃO CURSO", key: "REFEIÇÃO CURSO", width: 13},
            { header: "ALMOÇO", key: "ALMOÇO", width: 13},
            { header: "VT", key: "VT", width: 13},
            { header: "CONTRATO", key: "CONTRATO", width: 20},
            { header: "MODALIDADE", key: "MODALIDADE", width: 30},
            { header: "SALÁRIO", key: "SALÁRIO", width: 20},
            { header: "CH", key: "CH", width: 13},

                ]
    
        sheet.addRows(empresas.data);
    
        workbook.xlsx.writeBuffer()
        .then(buffer => saveAs(new Blob([buffer]), `inventário_empresas_${Date.now()}.xlsx`))
        .catch(err => console.log('Error writing excel export', err))
        }

    export async function exportarFaltas(data){
     
        let workbook = new Excel.Workbook();
    
        workbook.creator = '@sisa';
        workbook.lastModifiedBy = '@sisa';
    
        workbook.created = new Date(1985, 8, 30);
        workbook.modified = new Date();
        workbook.lastPrinted = new Date(2016, 9, 27);
    
        workbook.views = [
        {
                x: 0, y: 0, width: 10000, height: 20000,
                firstSheet: 0, activeTab: 1, visibility: 'visible'
            }
        ]
    
        const sheet = workbook.addWorksheet('Faltas');

        data.map((array, i) => {
            data[i]['dataExportar'] = new Date(array['dataExportar'])
            data[i]['minutos'] = Time.MinutesForHours(data[i]['tempo'])[1]
            data[i]['horas'] = Time.MinutesForHours(data[i]['tempo'])[0]
            
            if (data[i]['periodo'] ==='dia') { //Verifica se o desconto será o dia completo
                if (data[i]['tipo_salario']==='vigente'){ // Verifica se será sobre o salário vigente
                    data[i]['desconto'] = data[i]['salario']/30
                } else{
                    if(data[i]['carga_horaria']==='04:00'){ // veriica se será sobre 4 ou 6 horas
                        data[i]['desconto'] = data[i]['salario']*100/30
                    } else{
                        data[i]['desconto'] = data[i]['salario']*150/30
                    }
                }
            } else{
                data[i]['desconto'] = data[i]['tempo']*(5.51/60) // desconto baseado em horas
            }
        })
        
        sheet.columns = [
            { header: "NOME", key: "nome", width: 50,},
            { header: "EMPRESA", key: "empresa", width: 50},
            { header: "DATA", key: "dataExportar", width: 13},
            { header: "PERIODO", key: "periodo", width: 13},
            { header: "ATIVIDADE", key: "atividade", width: 13},
            { header: "HORAS", key: "horas", width: 13},
            { header: "MINUTOS", key: "minutos", width: 13},
            { header: "DESCONTO", key: "desconto", width: 13,style: {numFmt: '"R$ "#,##0.00'}},
            { header: "ESTADO", key: "status", width: 13},
                ]
    
        sheet.addRows(data);
    
        workbook.xlsx.writeBuffer()
        .then(buffer => saveAs(new Blob([buffer]), `faltas_${Date.now()}.xlsx`))
        .catch(err => console.log('Error writing excel export', err))

    }



import JovemService from '../services/jovens'
import Excel from 'exceljs'
import{ saveAs } from "file-saver";

async function exportarInventario(){
    
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
        { header: "CTPS", key: "CTPS", width: 10},
        { header: "SERIE", key: "SERIE", width: 10},
        { header: "ENDEREÇO", key: "ENDEREÇO", width: 70},
        { header: "NUMERO", key: "NUMERO", width: 7},
        { header: "BAIRRO", key: "BAIRRO", width: 55},
        { header: "CEP", key: "CEP", width: 10},
        { header: "TELEFONES", key: "TELEFONES", width: 64},
        { header: "MAE", key: "MAE", width: 50},
        { header: "RG DA MÃE", key: "RG DA MÃE", width: 15},
        { header: "CPF DO MÃE", key: "CPF DO MÃE", width: 14},
        { header: "PAI", key: "PAI", width: 50},
        { header: "RG DO PAI", key: "RG DO PAI", width: 15},
        { header: "CPF DO PAI", key: "CPF DO PAI", width: 14},
        { header: "ESCOLA", key: "ESCOLA", width: 70},
        { header: "END ESCOLA", key: "END ESCOLA", width: 70},
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
        { header: "VALOR", key: "VALOR", width: 15},
        { header: "VT", key: "VT", width: 15},
        { header: "ADMISSÃO", key: "ADMISSÃO", width: 15,style: {numFmt: 'dd/mm/yyyy'}},
        { header: "INICIO EMPRESA", key: "INICIO EMPRESA", width: 15,style: {numFmt: 'dd/mm/yyyy'}},
        { header: "TÉRMINO EMPRESA", key: "TÉRMINO EMPRESA", width: 15,style: {numFmt: 'dd/mm/yyyy'}},
        { header: "DEMISSÃO", key: "DEMISSÃO", width: 15,style: {numFmt: 'dd/mm/yyyy'}},
        { header: "OBS PANDEMIA", key: "OBS PANDEMIA", width: 50},
        { header: "CURSO", key: "CURSO", width: 17},
        { header: "SALÁRIO", key: "SALÁRIO", width: 17},
        { header: "CONTRATO", key: "CONTRATO", width: 12},
        { header: "STATUS", key: "status", width: 10},
        { header: "FERIAS", key: "FERIAS", width: 22},
        { header: "DIA AP", key: "DIA AP", width: 14},
        { header: "CARGA HORÁRIA", key: "CARGA HORÁRIA", width: 14},
        { header: "JORNADA", key: "JORNADA", width: 14},
        { header: "CAPTAÇÃO", key: "CAPTAÇÃO", width: 15},
        { header: "OBS", key: "OBS", width: 70}
            ]



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


    sheet.addRows(jovens.data);

    workbook.xlsx.writeBuffer()
    .then(buffer => saveAs(new Blob([buffer]), `inventário_${Date.now()}.xlsx`))
    .catch(err => console.log('Error writing excel export', err))
    }
        
export default exportarInventario;



import { format,isValid } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';

class dataFormat {

    fullDateBR(props) {

        let date = new Date(props);
        console.log(date.toLocaleDateString('pt-br',{timeZone: 'UTC'}))
        return date.toLocaleDateString('pt-br',{timeZone: 'UTC'})
        /*
        let date = new Date(`${String(props)} 00:00:00`);
        console.log(props)
        console.log('---------------')
        console.log(date)


        if (!isValid(date)) {
            return 0;
        } else {
            let newDate = format(date, 'dd/MM/yyyy');
            return newDate;
        }*/
    };

    iso(props) {

        const utcStringFormated = props.replace("Z","")
        let date = new Date(utcStringFormated);

        if (!isValid(date)) {
            return 0
        } else {
            let newDate = format(date, 'yyyy-MM-dd',{ locale: ptBR});
            return newDate;
        }
    };

    day(props) {

        const utcStringFormated = props.replace("Z","")
        let date = new Date(utcStringFormated);
        return date.getDate()
       
        /*
        let date = new Date(String(props));

        if (!isValid(date)) {
            return 0
        } else {
            let newDate = format(date, 'dd');
            return newDate;
        }*/
    };

    month(props) {

        const utcStringFormated = props.replace("Z","")
        let date = new Date(utcStringFormated);
        return date.getMonth()

        /* let date = new Date(String(props));

        if (!isValid(date)) {
            return 0
        } else {
            let newDate = format(date, 'MM');
            return newDate;
        }*/
    };

    fullMonth(props) {

        let date = new Date(props);
        return date.toLocaleDateString('pt-BR',{timeZone: 'UTC',month:'long'})

        /*
        let date = new Date(String(props));

        if (!isValid(date)) {
            return 0
        } else {
            let newDate = format(date, 'MMMM', { locale: ptBR });
            return newDate;
        }*/
    };

    year(props) {

        const utcStringFormated = props.replace("Z","")
        let date = new Date(utcStringFormated);
        return date.getFullYear()

        /*
        let date = new Date(String(props));

        if (!isValid(date)) {
            return 0
        } else {
            let newDate = format(date, 'yyyy');
            return newDate;
        } */

    };
};

export default new dataFormat();
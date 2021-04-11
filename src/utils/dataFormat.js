import { format } from 'date-fns'
import { isValid } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

class dataFormat {

    fullDateBR(props) {

        let date = new Date(props);
        return date.toLocaleDateString('pt-BR',{timeZone: 'UTC'})
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
        
        let date = new Date(String(props));

        if (!isValid(date)) {
            return 0
        } else {
            let newDate = format(date, 'yyyy-MM-dd');
            return newDate;
        }
    };

    day(props) {

        let date = new Date(props);
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

        let date = new Date(props);
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

        let date = new Date(props);
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
import dataFormat from "../../../utils/dataFormat";

function dateBetweenFilterFn(rows, id, filterValues) {
    let initialDate = new Date(filterValues[0]);
    let finalDate = new Date(filterValues[1]);
    if (!dataFormat.isValidDate(filterValues[0]) || !dataFormat.isValidDate(filterValues[1])) return rows
    return rows.filter(r => {
      let time = new Date(dataFormat.brToIso(r.values[id]))
      if (filterValues.length === 0) return rows;
      return (time >= initialDate && time <= finalDate);
    });
  }

export default dateBetweenFilterFn


function convert_unix_time_to_postgresql_time_format(time) {
    if(!time) return '';

    const utc_year = new Date(time).getUTCFullYear();
    const utc_month = (new Date(time).getUTCMonth() + 1).toString().padStart(2,0);
    const utc_date = new Date(time).getUTCDate().toString().padStart(2,0);
    const utc_hour = new Date(time).getUTCHours().toString().padStart(2,0);
    const utc_mins = new Date(time).getUTCMinutes().toString().padStart(2,0);
    const utc_secs = new Date(time).getUTCSeconds().toString().padStart(2,0);
    const utc_millisec = new Date(time).getUTCMilliseconds();

    return `${utc_year}-${utc_month}-${utc_date} ${utc_hour}:${utc_mins}:${utc_secs}.${utc_millisec}`;
}

module.exports = {
    convert_unix_time_to_postgresql_time_format
}
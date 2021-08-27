import http from 'http';

const logoutRequest = (access_token: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const options = {
            host: 'auth',
            port: 3001,
            path: '/logout',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };

        let marker = false;
        const httpreq = http.request(options, function (response) {
            response.setEncoding('utf8');

            response.on('data', function (chunk) {
                if (chunk === 'OK') marker = true;
            });

            response.on('end', function () {
                resolve(marker);
            });
        });
        httpreq.end();
    });
};

export default logoutRequest;

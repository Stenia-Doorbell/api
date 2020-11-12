console.log('Loaded service worker!');

self.addEventListener('push', ev => {
    const data = ev.data.json();
    console.log('Got push', data);
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: 'https://www.steniabeheer.nl/assets/logo-transparent-sm@1x-fb8adc024440fdde785eb1b7e51eefdbda4b8f4cafb151b5981490032110ab09.png'
    });
});

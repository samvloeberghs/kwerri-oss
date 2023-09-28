import { AboutComponent } from './about.component';
import { environment } from '../../environment';

export const routes = [
    {
        path: '',
        component: AboutComponent,
        data: {
            seo: {
                title: `About Sam - ${ environment.seo.title }`,
                description: `I'm a 35 year old software engineer living in Belgium. At the time of writing my main project is working as a senior software engineer / frontend architect at KOR Financial. Together with an awesome team we provide regulated and non-regulated data and compliance post-trade tools to derivatives market participants globally.`,
                shareImg: '/assets/share/home.png',
            },
        },
    },
];

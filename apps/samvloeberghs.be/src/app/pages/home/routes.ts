import { HomeComponent } from './home.component';
import { environment } from '../../environment';

export const routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            seo: {
                title: environment.seo.title,
                description: `Hi there! 👋 Thank you for visiting my website! I'm a Belgium 🇧🇪 based freelance software architect and Internet entrepreneur, currently focusing on frontend technologies.`,
                shareImg: '/assets/share/home.png',
            },
        },
    },
];

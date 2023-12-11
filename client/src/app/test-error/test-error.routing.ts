import { Routes } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { TestErrorComponent } from "./test-error.component";
import { ServerErrorComponent } from "./server-error/server-error.component";

export const TestErrorRoutes: Routes = [
    {path: '', component: TestErrorComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: 'server-error', component: ServerErrorComponent},
]
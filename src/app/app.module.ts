import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import {AppMaterialModule} from './angularMaterial/angular.material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AppServiceService } from './services/httpService/app-service.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotesComponent } from './components/notes/notes.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { NotesIconsComponent } from './components/notes-icons/notes-icons.component'; 
import {AuthGuardGuard} from './authGuard/auth-guard.guard';
import { DisplayNotesComponent } from './components/display-notes/display-notes.component';
import { NoteMainComponent } from './components/note-main/note-main.component';
import { DialogNoteComponent } from './components/dialog-note/dialog-note.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { ArchiveIconComponent } from './components/archive-icon/archive-icon.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ColorPlateIconComponent } from './components/color-plate-icon/color-plate-icon.component';
import { MoreVerticleIconComponent } from './components/more-verticle-icon/more-verticle-icon.component';
import { ReminderIconComponent } from './components/reminder-icon/reminder-icon.component';
import { PersonAddIconComponent } from './components/person-add-icon/person-add-icon.component';
import { PanormaIconComponent } from './components/panorma-icon/panorma-icon.component';
import { UnarchiveIconComponent } from './components/unarchive-icon/unarchive-icon.component';
import { SearchPipe } from './search.pipe';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { ImageDialogComponent } from './components/image-dialog/image-dialog.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LabelComponent } from './components/label/label.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { QuestionsComponent } from './components/questions/questions.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagenotfoundComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    NotesComponent,
    NotesIconsComponent,
    DisplayNotesComponent,
    NoteMainComponent,
    DialogNoteComponent,
    ArchiveComponent,
    TrashComponent,
    ArchiveIconComponent,
    ToolbarComponent,
    ColorPlateIconComponent,
    MoreVerticleIconComponent,
    ReminderIconComponent,
    PersonAddIconComponent,
    PanormaIconComponent,
    UnarchiveIconComponent,
    SearchPipe,
    SearchbarComponent,
    EditDialogComponent,
    ImageDialogComponent,
    LabelComponent,
    ReminderComponent,
    CollaboratorComponent,
    QuestionsComponent,
  ],
  entryComponents : [DialogNoteComponent,EditDialogComponent,ImageDialogComponent,CollaboratorComponent],
  imports: [
    OwlDateTimeModule, OwlNativeDateTimeModule,
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    ImageCropperModule, 
     FroalaEditorModule.forRoot(),FroalaViewModule.forRoot()  
  ],
  providers: [AppServiceService,AuthGuardGuard,OwlDateTimeModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

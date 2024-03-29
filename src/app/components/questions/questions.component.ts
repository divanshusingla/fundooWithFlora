import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/dataService/data.service';
import { NoteServiceService } from 'src/app/services/noteService/note-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  noteData: any;
  idOfNote: any;
  result: any;
  response: any;
  question: any;
  noteTitle: any;
  noteDescription: any;
  replyOfQuestion: any;
  replyShow: any;
  toggleFloara = true;
  questionAndAnswersArrayLength: any;
  noOfLikes = 0;
  constructor(@Inject(ActivatedRoute) private route: ActivatedRoute, @Inject(NoteServiceService) private svc: NoteServiceService, @Inject(DataService) public dataSvc: DataService) {
  }

  ngOnInit() {
    this.idOfNote = this.route.snapshot.paramMap.get('id');
    this.getNoteData(this.idOfNote);
  }


  toggleEditor() {
    this.toggleFloara = !this.toggleFloara;
  }

  replyToggle(questionId) {
    for (var i = 0; i < this.questionAndAnswersArrayLength; i++) {
      if (this.noteData.questionAndAnswerNotes[i].id == questionId) {
        this.replyShow = this.noteData.questionAndAnswerNotes[i].id;
        this.toggleEditor();
        return;
      }
      else {
        this.replyShow = null;
      }
    }
  }

  getNoteData(id) {
    console.log("sdfffffffffffffffffff", id);
    this.result = this.svc.getNoteData(id)
    this.result.subscribe((response) => {
      this.response = response.data.data;
      this.noteData = this.response[0];
      console.log("the result is of notedata ", this.noteData);
      this.noteTitle = this.noteData.title;
      this.noteDescription = this.noteData.description;
      this.questionAndAnswersArrayLength = this.noteData.questionAndAnswerNotes.length;
    });
  }

  askQuestion(id) {
    let questionData =
    {
      message: this.question,
      notesId: id,
    }
    this.result = this.svc.addQuestionToNote(questionData)
    this.result.subscribe((response) => {
      this.response = response;
      // console.log('rewdfsadsad',this.response);
      this.getNoteData(questionData.notesId);
      this.question = "";
    });
  }



  replyQuestion(parentid) {
    this.replyShow = !this.replyShow;
    if (this.replyOfQuestion) {
      let data = {
        message: this.replyOfQuestion
      }
      this.svc.replyQuestion(data, parentid).subscribe((res: any) => {
        this.getNoteData(this.idOfNote);
        //console.log(this.question);
        this.replyOfQuestion = "";
        console.log(res);
      })
      this.toggleFloara = true;
    }
  }

  likeAnswer(id) {
    let data = {
      "like": true,
      id: id
    }
    this.svc.likeAnswer(data).subscribe((res: any) => {
      // console.log("response from the like answer ==============>>>>>>>>>>>", res);
    });
  this.countLikes(id);
  this.getNoteData(this.idOfNote);
  }

  dislikeAnswer(id) {
    let data = {
      "like": false,
      id: id
    }
    this.svc.likeAnswer(data).subscribe((res: any) => {
      // console.log("response from the dislike answer ==============>>>>>>>>>>>", res);
    });
    this.countLikes(id);
    this.getNoteData(this.idOfNote);
  }


  countLikes(questionId) {
    this.noOfLikes = 0;
    // console.log("enter in the count likes =>>>>>>>>>>>>>>>>>>>");
    for (var i = 1; i < this.questionAndAnswersArrayLength; i++) {
      if ((this.noteData.questionAndAnswerNotes[i].id == questionId) && (this.noteData.questionAndAnswerNotes[i].parentId == this.noteData.questionAndAnswerNotes[0].id)) {
        for (var j = 0; j < this.noteData.questionAndAnswerNotes[i].like.length; j++) {
          if (this.noteData.questionAndAnswerNotes[i].like[j].like == true) {
            this.noOfLikes++;
          }
        }
      }
    }
    return this.noOfLikes;
  }

  countLikesReply(questionId,parentId) {
    this.noOfLikes = 0;
    // console.log("enter in the count likes =>>>>>>>>>>>>>>>>>>>");
    for (var i = 1; i < this.questionAndAnswersArrayLength; i++) {
      if ((this.noteData.questionAndAnswerNotes[i].id == questionId) && (this.noteData.questionAndAnswerNotes[i].parentId == parentId)) {
        for (var j = 0; j < this.noteData.questionAndAnswerNotes[i].like.length; j++) {
          if (this.noteData.questionAndAnswerNotes[i].like[j].like == true) {
            this.noOfLikes++;
          }
        }
      }
    }
    return this.noOfLikes;
  }


}


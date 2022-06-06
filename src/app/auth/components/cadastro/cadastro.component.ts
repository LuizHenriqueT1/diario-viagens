import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  hide = true;

  signupForm = this.fb.group(
    {
      nome: ['', [Validators.required]],
      nick: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      recaptcha: ['', Validators.required],
      confirma_senha: ['']
    },
    { validators: [this.matchPasswords] }
  );

  matchPasswords(control: AbstractControl): ValidationErrors | null {
    return control.get('senha')!.value !== control.get('confirma_senha')!.value
      ? { matchPasswords: true }
      : null;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: HotToastService,
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit() {
    const { email, senha, nick, nome } = this.signupForm.value;
    this.authService
      .signupEmail(email, senha, nome, nick)
      .pipe(
        this.toast.observe({
          success: 'Usuário criado com sucesso',
          error: 'Um erro ocorreu',
          loading: 'Criando usuário...',
        })
      )
      .subscribe();
  }

  onLoginGoogle() {
    this.authService
      .loginGoogle()
      .pipe(
        this.toast.observe({
          success: 'Cadastro efetuado',
          error: 'Operação cancelada',
          loading: 'Fazendo cadastro...',
        })
      )
      .subscribe();
  }

  onLoginGithub() {
    this.authService
      .loginGithub()
      .pipe(
        this.toast.observe({
          success: 'Cadastro efetuado',
          error: 'Operação cancelada',
          loading: 'Fazendo cadastro...',
        })
      )
      .subscribe();
  }

  captchaIsLoaded = false;
  captchaSuccess = false;
  captchaIsExpired = false;
  captchaResponse?: string;

  theme: 'light' | 'dark' = 'light';
  size: 'compact' | 'normal' = 'normal';
  lang = 'pt';
  type: 'image' | 'audio' = 'image';
  useGlobalDomain: boolean = false;

  handleReset(): void {
    this.captchaSuccess = false;
    this.captchaResponse = undefined;
    this.captchaIsExpired = false;
    this.cdr.detectChanges();
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
    this.captchaIsExpired = false;
    this.cdr.detectChanges();
  }

  handleLoad(): void {
    this.captchaIsLoaded = true;
    this.captchaIsExpired = false;
    this.cdr.detectChanges();
  }

  handleExpire(): void {
    this.captchaSuccess = false;
    this.captchaIsExpired = true;
    this.cdr.detectChanges();
  }

  ngOnInit(): void {}
}

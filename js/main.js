'use strict';

{
  const question   = document.getElementById('question');//id=question取得
  const choices    = document.getElementById('choices'); //id=choices取得
  const btn        = document.getElementById('btn');     //id=btn取得
  const result     = document.getElementById('result');  //id=btn取得
  const scoreLabel = document.querySelector('#result > p'); //pを取得

  const quizSet = shuffle([  //クイズ一覧 ランダム順で出題
    {q: 'S この元素記号の日本名はどれかな?', c: ['硫黄', 'トリウム', 'セリウム', 'カルシウム']},
    {q: 'Al この元素記号の日本名はどれかな?', c: ['アルミニウム', 'ヘリウム', 'アルゴン', '炭素']},
    {q: 'Zr この元素記号の日本名はどれかな?', c: ['亜鉛', '鉛', '水銀', 'ヒ素']},
    {q: 'Mn この元素記号の日本名はどれかな?', c: ['マンガン', 'モリブテン', 'ヨウ素', 'カルシウム']},
    {q: 'Si この元素記号の日本名はどれかな?', c: ['ケイ素', 'リン', 'ヒ素', 'ホウ素']},
  ]);
  let currentNum = 0;              //最初はインデックスが0のクイズから始めたい
  let isAnswered;   //回答したかどうか判定するための変数を宣言
  let score = 0;



  function shuffle(arr) {  //フィッシャー・イェーツのシャッフル
    for (let i = arr.length - 1; i > 0; i--) { //iを1ずつずらしながらループ
      //ランダムに選ぶ範囲の終点のインデックスi
      //iは最後の要素のインデックス arr.length-1とする
      //iが1より大きいときiを1ずつ減らす
      const j = Math.floor(Math.random() * (i + 1));  //0～iのランダムな整数値を生成
      [arr[j], arr[i]] = [arr[i], arr[j]]; //分割代入 iとjを入れ替える
    }
    return arr;
  }

  function checkAnswer(li) {  //正誤判定処理
    if (isAnswered) {         //もしisAnsweredがtrue(回答済)なら
      return;                 //返す
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {//liがcの0番目と同じなら正解
      li.classList.add('correct');  //正解ならcorrectクラス付与
      score++;                      //スコア+1
    } else {
      li.classList.add('wrong');    //不正解ならwrongクラス付与
    }

    btn.classList.remove('disabled'); //正誤判定処理後disabledクラスを外す
  }

  function setQuiz() {
    isAnswered = false;

  question.textContent = quizSet[currentNum].q;  //HTMLのId=questionのテキストにquizSetのcurrentNum番目のqを代入

  while (choices.firstChild) {  //choicesの最初の子要素がある限り
    choices.removeChild(choices.firstChild); //choicesの最初の子要素を消す
  }

  const shuffledChoices = shuffle([...quizSet[currentNum].c]);
  //shuffle()で選択肢をシャッフルしてから表示
  //...スプレット演算子 元の配列をそのままにシャッフルされた配列を作る
  shuffledChoices.forEach(choice => { //quizSetのcをforeachでリストに代入していく
    const li = document.createElement('li');  //li要素を作成
    li.textContent = choice;                  //liにchoiceを代入
    li.addEventListener('click', () => {      //liをクリックした時のイベント
      checkAnswer(li);
    });
    choices.appendChild(li);                  //choicesに追加
  });

  if (currentNum === quizSet.length - 1) { //もし最後の問題だったら
    btn.textContent = '結果';        //ボタンのテキストを変える
  }
}

  setQuiz();

  btn.addEventListener('click', () => { //ボタンをクリックしたら
    if (btn.classList.contains('disabled')) { //disabledクラスが付いてたら
      return;                                 //返す
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {  //最後の問題なら
      scoreLabel.textContent = `正解数: ${score} / ${quizSet.length}`; //スコア表示
      result.classList.remove('hidden');          //hiddenクラスを取る
    } else {
    currentNum++;                       //currentNumを増やして
    setQuiz();                          //次の問題へ
    }
  });
}

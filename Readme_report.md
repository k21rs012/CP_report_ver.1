# クラウドプログラミング演習　最終課題
## リポジトリURL:https://github.com/k21rs012/CP_report_ver.1

## 概要
今回の最終課題は下記にも記載するが、ニフクラ mobile backend様の「サンプル＆チュートリアル一覧 アプリにログイン機能をつけよう！」をベースに作成した。ログイン時の処理は全てベースとなるプログラムが行っているので私はデータベースをAPIで接続した。  
今回私が作成した部分はログイン成功時のコンテンツである。  
まず下記にも記載するが、富士通クラウドテクノロジーズ株式会社様の「はじめての Monaca と mobile backend ～DBの使い方練習～」を参考におみくじ機能を作成した。これはデータベースに大吉や中吉、凶等の結果を予め保存しておき、その結果をランダムで取得してきて表示するものである。  
次に第10回で使用した遊戯王のCSVファイルをデータベースにインポートし、その中からモンスターをランダムでAとBそれぞれ1体ずつ取得する。そのモンスターの攻撃力と防御力を計算してデフォルトのHPの値である8000から値を引き、残ったHPの値で勝敗を判定するプログラムを作成した。
## 工夫した点
遊戯王のモンスターのデータベースを元に勝敗の判定を行う部分だが、Githubの作成初期のコミットを見ていただければ分かる通り最初はif文を多用してHPの計算と勝敗の判定を行っていた。だが、これではコードが美しくなく、コードを見る側としてもとても分かりづらいものとなってしまっていた。  
なので極力if文を使わないようにするために、まずローカル関数duel内のHPによる勝敗判定を三項演算子を使用して行うようにした。  
また、変更前の「kekka」のidに書き込む処理をそれぞれのif文内で行っていたものを、予めローカル変数resultを用意しておくことでそちらに書き込み、resultの出力を一文で済ませるように変更した。
- 変更前
```java
if (hpA > hpB) {
        document.getElementById("kekka").innerText = "Aの勝ちです。";
    } else if (hpA < hpB) {
        document.getElementById("kekka").innerText = "Bの勝ちです。";
    } else {
        document.getElementById("kekka").innerText = "引き分けです。";
    }
```
- 変更後
```java
result = hpA > hpB ? "Aの勝ちです。" : hpA < hpB ? "Bの勝ちです。" : "引き分けです。";

document.getElementById("results").innerText = result;
```
また、if文を少なくするために予めHPの計算を変数宣言内に組み込んだり、不要な条件分岐を削除することでより見やすく、そして処理の高速化を図った。
- 変更前
```java
var hpA = 0;
var hpB = 0;

if ((dfA - atkB) >= 0) {
    var hpA = 8000;
    var hpB = 8000 + (dfB - atkA);
} else if ((dfB - atkA) >= 0) {
    var hpA = 8000 + (dfA - atkB);
    var hpB = 8000;
} else if (atkA == atkB && dfA == dfB) {
    var hpA = 8000 + (dfA - atkB);
    var hpB = 8000 + (dfB - atkA);
} else{
    var hpA = 8000 + (dfA - atkB);
    var hpB = 8000 + (dfB - atkA);
}
```
- 変更後
```java
var hpA = 8000 + (dfA - atkB);
var hpB = 8000 + (dfB - atkA);

if ((dfA - atkB) >= 0) {
    hpA = 8000;
} else if ((dfB - atkA) >= 0) {
    hpB = 8000;
}
```


## 最終課題を作成するにあたって参考にさせていただいたプログラムや資料
- サンプル＆チュートリアル一覧 アプリにログイン機能をつけよう！,ニフクラ mobile backend,[https://github.com/NIFCLOUD-mbaas/monaca_login_template](https://github.com/NIFCLOUD-mbaas/monaca_login_template),閲覧 2022/12/19  
- はじめての Monaca と mobile backend ～DBの使い方練習～,富士通クラウドテクノロジーズ株式会社,[https://qiita.com/natsumo/items/d278c71c0211a7902767](https://qiita.com/natsumo/items/d278c71c0211a7902767),閲覧 2022/12/19
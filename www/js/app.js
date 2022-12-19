
var ncmb = new NCMB(appKey, clientKey);

///// Called when app launch
$(function () {
    $.mobile.defaultPageTransition = 'none';
    $("#LoginBtn").click(onLoginBtn);
    $("#RegisterBtn").click(onRegisterBtn);
    $("#YesBtn_logout").click(onLogoutBtn);
});

//----------------------------------USER MANAGEMENT-------------------------------------//
var currentLoginUser; //現在ログイン中ユーザー

function onRegisterBtn() {
    //入力フォームからusername, password変数にセット
    var username = $("#reg_username").val();
    var password = $("#reg_password").val();

    var user = new ncmb.User();
    user.set("userName", username)
        .set("password", password);

    // ユーザー名とパスワードで新規登録
    user.signUpByAccount()
        .then(function (reg_user) {
            // 新規登録したユーザーでログイン
            ncmb.User.login(reg_user)
                .then(function (login_user) {
                    alert("新規登録とログイン成功");
                    currentLoginUser = ncmb.User.getCurrentUser();
                    $.mobile.changePage('#DetailPage');
                })
                .catch(function (error) {
                    alert("ログイン失敗！次のエラー発生: " + error);
                });
        })
        .catch(function (error) {
            alert("新規登録に失敗！次のエラー発生：" + error);
        });
}

function onLoginBtn() {
    var username = $("#login_username").val();
    var password = $("#login_password").val();
    // ユーザー名とパスワードでログイン
    ncmb.User.login(username, password)
        .then(function (user) {
            alert("ログイン成功");
            currentLoginUser = ncmb.User.getCurrentUser();
            $.mobile.changePage('#DetailPage');
        })
        .catch(function (error) {
            alert("ログイン失敗！次のエラー発生: " + error);
        });
}

function onLogoutBtn() {
    ncmb.User.logout();
    alert('ログアウト成功');
    currentLoginUser = null;
    $.mobile.changePage('#LoginPage');
}

function pushButton() {
    // テキストエリアの値を取得する
    var message = document.getElementById("message").value;
    // アラートで表示する
    alert(message);

    /** mobile backend に保存する **/
    // 保存先クラスの生成
    var MessageClass = ncmb.DataStore("MessageClass");
    // クラスインスタンスの生成
    var messageClass = new MessageClass();
    // データを設定して保存する
    messageClass.set("message", message).save();
}
function omikuji() {
    var Omikuji = ncmb.DataStore("omikuji");
    // 取得処理
    Omikuji.fetchAll()
        .then(function (objects) {
            /* 取得成功時の処理 */
            // データ数内で乱数を作成
            var random = Math.floor(Math.random() * objects.length);
            // 乱数番目のデータ
            var object = objects[random];
            // 「result」フィールドの値を取得
            var result = object.get("result");
            // 画面に結果を表示
            document.getElementById("result").innerText = result;
        })
        .catch(function (error) {
            /* 取得失敗時の処理 */
            alert("Error: " + error.code);
        });
}

function monster() {
    var Monster = ncmb.DataStore("monster");

    Monster.fetchAll()
        .then(function (objects) {
            /* 取得成功時の処理 */
            // データ数内で乱数を作成
            var random = Math.floor(Math.random() * objects.length);
            // 乱数番目のデータ
            var object = objects[random];
            // 「name」フィールドの値を取得
            var result = object.get("name");
            var level = object.get("level");
            var attack = object.get("attack");
            var defence = object.get("defence");
            // 画面に結果を表示
            document.getElementById("name").innerText = result;
            document.getElementById("level").innerText = level;
            document.getElementById("attack").innerText = attack;
            document.getElementById("defence").innerText = defence;
        })
        .catch(function (error) {
            /* 取得失敗時の処理 */
            alert("Error: " + error.code);
        });
}
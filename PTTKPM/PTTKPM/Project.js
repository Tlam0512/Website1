        var today = new Date();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        function layttHD() { //Lấy thông tin được điền vào từ phiếu hóa đơn

            if (localStorage.getItem("HDKH") == null) {
                var arr = [];
                localStorage.setItem('HDKH', JSON.stringify(arr));
            }
            if (CheckHD()) {
                var arrHD = JSON.parse(localStorage.getItem('HDKH'));
                var gioitinh, thanhtoanpt;
                var kh = {
                    gt: document.getElementById('nngioitinh').value,
                    tt: document.getElementById('pttt').value
                }
                switch (kh.gt) { //Kiểm tra giá trị chọn của các option về giới tính ở điền hóa đơn
                    case '0':
                        gioitinh = 'Male';
                        break;
                    case '1':
                        gioitinh = 'Female';
                        break;
                    case '2':
                        gioitinh = "Unknown";
                        break;
                    default:
                        break;

                }
                switch (kh.tt) { //Kiểm tra option phương thức thanh toán
                    case '1':
                        thanhtoanpt = 'VisaCard';
                        break;
                    case '2':
                        thanhtoanpt = 'Paypal';
                        break;
                    case '3':
                        thanhtoanpt = 'InternetBanking';
                        break;
                    case '4':
                        thanhtoanpt = 'Cash';
                        break;
                    default:
                        break;
                }
                var IDHD = 1;
                var chitiethoadon = JSON.parse(localStorage.getItem('cart'));
                var userr = JSON.parse(localStorage.getItem('buybyuser')); //local để xác định username nào đang đăng nhập
                for (var i = 0; i < arrHD.length; i++) {
                    if (IDHD == arrHD[i].IDhd) IDHD++;
                }
                var arr = { IDhd: IDHD, TK: userr[0].user, timehd: dateTime, tenkh: document.getElementById('nnhoten').value, sdtkh: document.getElementById('nnsdt').value, mailkh: document.getElementById('nnmail').value, tpkh: document.getElementById('nncity').value, diachikh: document.getElementById('nndiachi').value, ngaysinhkh: document.getElementById('nnngaysinh').value, pttt: thanhtoanpt, gioitinhkh: gioitinh, note: document.getElementById('note').value, tthd: "Chưa xử lý", cthoadon: chitiethoadon, tongtienhd: total() };
                arrHD.push(arr);
                localStorage.setItem('HDKH', JSON.stringify(arrHD));
                alert("Đặt hàng thành công !");
                reset();
            }
        }

        function checkQuantity(temp) {
            var s = 0;
            var arr = JSON.parse(localStorage.getItem('cart'));
            for (var i = 0; i < arr.length; i++)
                if (temp == arr[i].product) s++;
            return s;
        }

        function deletecart(namedelete) { //Xóa sản phẩm khỏi giỏ hàng
            var arr = JSON.parse(localStorage.getItem('cart'));
            for (var i = 0; i < arr.length; i++) {
                if (namedelete == arr[i].product) {
                    if (confirm('Bạn có chắc muốn xóa sản phẩm khỏi giỏ hàng?')) {
                        arr.splice(i, 1);
                        for (j = i; j < arr.length; j++) {
                            if (namedelete == arr[j].product) {
                                arr.splice(j, 1);
                                break;
                            }
                        }
                    }
                }

            }
            localStorage.setItem('cart', JSON.stringify(arr));
            window.location.reload();
        }

        function reloadHD() {
            window.location.reload();
        }
        var mid_2 = 0;

        function checkQuantity_2(temp, temp_1) {
            var s = 0;
            var arr = JSON.parse(localStorage.getItem('HDKH'));
            for (var i = 0; i < arr.length; i++)
                if (arr[i].IDhd == temp_1) {
                    for (var j = 0; j < arr[i].cthoadon.length; j++) {
                        if (temp == arr[i].cthoadon[j].product) {
                            s++;
                            mid_2 = arr[i].cthoadon[j].product;
                        }
                    }
                    break;
                }
            return s;
        }

        function showcthd_2(temp) { //Xuất chi tiết hóa đơn của từng hóa đơn
            var tr = "";
            var arrs = JSON.parse(localStorage.getItem('HDKH'));
            for (var i = 0; i < arrs.length; i++) {
                if (temp == arrs[i].IDhd) {
                    tr += '<tr><th>ID hóa đơn</th><th>IDSP</th><th>name</th><th>Brand</th><th>Img</th><th>Quantity</th><th>Price<a onclick="bill()" style="color:red;background-color:white;padding:0px 8px;border-radius:50%;cursor:pointer;margin-left:20px">-</a></th></tr>';
                    for (var j = 0; j < arrs[i].cthoadon.length; j++) {
                        if (mid_2 == arrs[i].cthoadon[j].product) continue;
                        else {
                            tr += '<tr><td>' + arrs[i].IDhd + '</td><td>' + arrs[i].cthoadon[j].product + '</td><td>' + arrs[i].cthoadon[j].name + '</td><td>' + arrs[i].cthoadon[j].brand + '</td><td><img src="' + arrs[i].cthoadon[j].img + '" style="width:80px;height:80px"/></td><td>' + checkQuantity_2(arrs[i].cthoadon[j].product, arrs[i].IDhd) + '</td><td>' + arrs[i].cthoadon[j].price + '$</td></tr>';
                        }
                    }
                    break;
                }

            }
            document.getElementById('dssp').innerHTML = tr;
        }

        function bill() { //Xem lại các hóa đơn mà username này đã đặt
            var arrs = JSON.parse(localStorage.getItem('HDKH'));
            var arr = JSON.parse(localStorage.getItem('buybyuser'));
            var tr = '<tr><th>ID hóa đơn</th><th>Tên người mua(Account đặt hàng)</th><th>Thời gian đặt hàng</th><th>SĐT</th><th>Địa chỉ</th><th>Gmail</th><th>PTTT</th><th>NOTE</th><th>Tổng tiền</th></tr>';
            for (var i = 0; i < arrs.length; i++) {
                if (arrs[i].TK == arr[0].user) {
                    tr += '<tr><td>' + arrs[i].IDhd + '</td><td>' + arrs[i].tenkh + '(' + arrs[i].TK + ')</td><td>' + arrs[i].timehd + '</td><td>' + arrs[i].sdtkh + '</td><td>' + arrs[i].diachikh + ' ' + arrs[i].tpkh + '</td><td>' + arrs[i].mailkh + '</td><td>' + arrs[i].pttt + '</td><td>' + arrs[i].note + '</td><td>' + arrs[i].tongtienhd + '$<a onclick="showcthd_2(' + arrs[i].IDhd + ')" style="color:red;background-color:white;padding:3px 8px;border-radius:50%;cursor:pointer;margin-left:20px;font-weight:bold">+</a></td></tr>';
                }
            }
            document.getElementById('dssp').innerHTML = tr;
        }

        function cartofuser() { //Lấy dữ liệu từ local cart để inner các sản phẩm vào trong giỏ
            var s = "",
                temp;
            var arr = JSON.parse(localStorage.getItem('cart'));
            for (var i = 0; i < arr.length; i++) {
                temp = 0;
                for (var j = i - 1; j >= 0; j--) {
                    if (arr[i].product == arr[j].product) {
                        temp = 1;
                        break;
                    }
                }
                if (temp == 1) continue;
                s += '<tr><td><div class="cart-info"><img style="width:130px;height:195px" src="' + arr[i].img + '" alt="" /><td><div style="font-size:16px"><p>' + arr[i].name + '</p><td><p>' + arr[i].price.toLocaleString('vi-VN', {minimumFractionDigits: 0, maximumFractionDigits: 3}) + 'đ</p><td><br/><a href="#" onclick="deletecart(\'' + arr[i].product + '\')" style="font-size:16px;border:1px solid #ddd;padding:5px">X</a></div></div></td><td>' + arr[i].product + '</td><td><input readOnly=true value="' + checkQuantity(arr[i].product) + '" /></td><td>' + arr[i].price.toLocaleString('vi-VN', {minimumFractionDigits: 0, maximumFractionDigits: 3}) + 'đ</td></tr>';
            }
            s = '<tr><th>SẢN PHẨM</th><th>TÊN SẢN PHẨM</th><th>GIÁ</th><th>XÓA</th><th>MÃ SẢN PHẨM</th><th>SỐ LƯỢNG</th><th>THÀNH TIỀN</th></tr>' + s;
            document.getElementById('dssp').innerHTML = s;
        }

        function total() { //Tính tổng giá các sản phẩm của hóa đơn (kèm tax 10%)
            var totalprice = 0.0;
            var pricenottax = 0.0;
            var s = "";
            var arr = JSON.parse(localStorage.getItem('cart'));
            for (var i = 0; i < arr.length; i++) {
                pricenottax += arr[i].price;
            }
            totalprice = Math.ceil(pricenottax * 110 / 100);
            s = '<tr><th colspan="2">THANH TOÁN</th></tr><tr><td>THÀNH TIỀN</td><td>' + Math.ceil(pricenottax, 2).toLocaleString('vi-VN',{minimumFractionDigits:0,maximumFractionDigits:3}) + 'đ</td></tr><tr><td>Tax</td><td>10%</td></tr><tr><td>TỔNG TIỀN HÀNG</td><td>' + totalprice.toLocaleString('vi-VN',{minimumFractionDigits:0,maximumFractionDigits:3}) + 'đ</td></tr>'
            document.getElementById('totalHoaDon').innerHTML = s;
            return totalprice;
        }

        function outHD() {
            document.getElementById('hoadon').style.zIndex = "-1";
            document.getElementById('hoadon').style.opacity = "0";
            document.getElementById('logbox_0').style.zIndex = "-1";
            document.getElementById('logbox_0').style.opacity = "0";
        }

        function hienHD() {
            document.getElementById('logbox_0').style.zIndex = "14";
            document.getElementById('logbox_0').style.opacity = "0.2";
            document.getElementById('hoadon').style.zIndex = "15";
            document.getElementById('hoadon').style.opacity = "1";
        }

        function reset() {
            document.getElementById('nnhoten').value = "";
            document.getElementById('nnsdt').value = "";
            document.getElementById('nnmail').value = "";
            document.getElementById('nncity').value = "";
            document.getElementById('nndiachi').value = "";
            document.getElementById('note').value = "";
            document.getElementById('nnngaysinh').value = "";
            document.getElementById('pttt').value = "";
            document.getElementById('nngioitinh').value = "";
        }

        function CheckHD() { //Kiểm tra hóa đơn đã điền đủ thông tin
            if (document.getElementById('nnhoten').value == "" ||
                document.getElementById('nnsdt').value == "" ||
                document.getElementById('nnmail').value == "" ||
                document.getElementById('nncity').value == "" ||
                document.getElementById('nndiachi').value == "" ||
                document.getElementById('nnsdt').value == "" ||
                document.getElementById('pttt').value == "" ||
                document.getElementById('nngioitinh').value == "") {
                alert('Hãy điền đầy đủ thông tin hóa đơn');
                return false;
            } else return true;
        }

        function invthongbaobox() {
            document.getElementById('boxtb').style.animation = "tb_2 1s forwards";
        }
        var count = 0;

        function invinbox() {
            if (count == 0) {

                document.getElementById('nav').style.animation = "navside_2 2s forwards";
                document.getElementById('shows').style.animation = "full 2s forwards";
                count++;
                return 0;
            }
            if (count == 1) {

                document.getElementById('nav').style.animation = "navside 2s forwards";
                document.getElementById('shows').style.animation = "full_2 2s forwards";
                count++;
                return 0;
            }
            if (count == 2) {
                count = 0;
                invinbox();
            }
        }
        var myIndex = 0;

        function slider() {
            var i;
            var x = document.getElementsByClassName("slideimg");
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            myIndex++;
            if (myIndex > x.length) { myIndex = 1 }
            x[myIndex - 1].style.display = "block";
            setTimeout(slider, 2000);
        }

        function checkGioHang() {
            var arr = JSON.parse(localStorage.getItem('cart'));
            if (localStorage.getItem('cart') == null || arr[0] == null)
                alert("Giỏ hàng trống");
            else window.location.assign('cart.html');
        }

        function createNewAccount() {
            var userArray = JSON.parse(localStorage.getItem('user'));
            var member = { username: document.getElementById('username').value, password: document.getElementById('password').value, fullname: document.getElementById('fullname').value, usertype: "member", email: document.getElementById('email').value, phone: document.getElementById('phone').value, address: document.getElementById('address').value };
            if (check(member)) {
                userArray.push(member);
                localStorage.setItem('user', JSON.stringify(userArray));
                alert("Đăng ký thành công");
                window.location.assign("DOAN.html");
            }
        }

        function createAdmin() {
            var userArray = [];
            if (localStorage.getItem('user') == null) {
                var user1 = { username: 'trong520466', password: 'admin', fullname: 'Admin', usertype: 'admin', email: '###', phone: '###', address: "###" };
                userArray.push(user1);
                console.log(userArray);
                localStorage.setItem('user', JSON.stringify(userArray));
            }
        }

        function check(obj) { //Check thông tin đăng ký
            var userArray = JSON.parse(localStorage.getItem('user'));
            for (var i = 0; i < userArray.length; i++) {
                if (obj.username == userArray[i].username && obj.usertype == userArray[i].usertype) {
                    alert("Username đã tồn tại");
                    document.getElementById('username').focus();
                    return false;
                }
            }

            if (obj.username == "") {
                alert("Vui lòng nhập tên đăng kí");
                document.getElementById('username').focus();
                return false;
            }
            if (obj.password == "") {
                alert("Vui lòng nhập password");
                document.getElementById('password').focus();
                return false;
            }
            if (document.getElementById('passwordrp').value != obj.password) {
                alert("Password sai");
                document.getElementById('passwordrp').focus();
                return false;
            }
            if (obj.fullname == "") {
                alert("Vui lòng nhập họ tên");
                document.getElementById('fullname').focus();
                return false;
            }
            if (obj.email == "") {
                alert("Vui lòng nhập email");
                document.getElementById('email').focus();
                return false;
            }
            if (obj.phone == "") {
                alert("Vui lòng nhập số điện thoại");
                document.getElementById('phone').focus();
                return false;
            }
            if (obj.address == "") {
                alert("Vui lòng nhập địa chỉ");
                document.getElementById('address').focus();
                return false;
            }
            return true;
        }

        function checkttdn_1() { //Đăng nhập bằng tài khoản admin
            var x = 0;
            var userArray = JSON.parse(localStorage.getItem('user'));
            var username = document.getElementById('tendn').value;
            var password = document.getElementById('mk').value;
            for (var i = 0; i < userArray.length; i++) {
                if (userArray[i].username == username && userArray[i].password == password && userArray[i].usertype == "admin") { //Kiểm tra thông tin
                    window.location.assign("admin.html"); //Truy cập vào trang admin.html
                    alert("Truy cập thành công!");
                    x = 1;
                }
            }
            if (x == 0) alert("Hãy kiểm tra lại thông tin đăng nhập");
        }

        function checkttdn() { //Đăng nhập bằng tài khoản user
            var x = 0;
            localStorage.removeItem('buybyuser'); //Xóa vùng đệm lưu tên username đã login vào (Khi logout)
            var username = document.getElementById('tendn').value; //Lấy tt input
            var password = document.getElementById('mk').value; //Lấy tt input
            localStorage.removeItem('cart'); //Xóa hết thông tin giỏ hàng của khách khi logout khỏi account (Khi logout)
            if (localStorage.getItem('cart') == null) { //Tạo lại giỏ hàng khi login
                var cartarray = [];
                localStorage.setItem('cart', JSON.stringify(cartarray));
            }
            var userArray = JSON.parse(localStorage.getItem('user')); //Lấy tt tài khoản đã đăng kí vào
            var buyofuser = [];
            for (var i = 0; i < userArray.length; i++) {
                if (userArray[i].username == username && userArray[i].password == password && userArray[i].usertype == "member") { //Kiểm tra thông tin đăng nhập
                    if (localStorage.getItem('buybyuser') == null) {
                        buyofuser = [{ user: username }];
                        localStorage.setItem('buybyuser', JSON.stringify(buyofuser));
                    }
                    hideTK(); //Hiện username bên góc của web để thể hiện đối tượng nào đã login vào
                    alert("Đăng nhập thành công");
                    out(); //Thoát khỏi bảng đăng nhập
                    x = 1;
                } else if (userArray[i].username == username && userArray[i].password != password && userArray[i].usertype == "member") { //Kiểm tra sai mật khẩu
                    alert("Hãy kiểm tra lại mật khẩu");
                    return 0;
                }
            }
            if (x == 0) alert("Đăng nhập thất bại");
        }
        var dem = 0;

        function showtt() {
            if (dem == 0) {
                document.getElementById('dxbox').style.display = "block";
                dem++;
                return 0;
            }
            if (dem == 1) {
                document.getElementById('dxbox').style.display = "none";
                dem++;
                return 0;
            }
            if (dem == 2) {
                dem = 0;
                showtt();
            }
        }

        function hideTK() { //Hiện username
            if (localStorage.getItem('buybyuser') != null) {
                var userArray = JSON.parse(localStorage.getItem('buybyuser'));
                document.getElementById('tkkh').innerHTML = 'Username:<a href="#" onclick="showtt()"><u>' + userArray[0].user + '</u></a>';
            }
        }

        function dangxuat() {
            localStorage.removeItem('buybyuser');
            localStorage.removeItem('cart');
            window.location.assign('DOAN.html');
        }

        function CreateAccountBoard() {
            document.getElementById('logbox_2').style.zIndex = "10";
            document.getElementById('logbox_2').style.opacity = "1";
            document.getElementById('logbox').style.zIndex = "-1";
            document.getElementById('logbox').style.opacity = "0";
        }

        function out_2() {
            document.getElementById('logbox_2').style.opacity = "0";
            document.getElementById('logbox_2').style.zIndex = "-1";
            document.getElementById('wrapper').style.opacity = "1";
            document.getElementById('logbox_0').style.opacity = "0";
            document.getElementById('logbox_0').style.zIndex = "-1";
        }

        function dangnhap() {
            if (localStorage.getItem('buybyuser') != null) {
                alert("Bạn đã đăng nhập rồi !");
                return 0;
            }
            document.getElementById('wrapper').style.opacity = "0.2";
            document.getElementById('logbox').style.zIndex = "10";
            document.getElementById('logbox').style.opacity = "1";
            document.getElementById('logbox_2').style.opacity = "0";
            document.getElementById('logbox_2').style.zIndex = "-1";
            document.getElementById('logbox_0').style.zIndex = "8";
            document.getElementById('logbox_0').style.opacity = "0.2";
        }

        function out() {
            document.getElementById('logbox').style.opacity = "0";
            document.getElementById('logbox').style.zIndex = "-1";
            document.getElementById('wrapper').style.opacity = "1";
            document.getElementById('logbox_0').style.opacity = "0";
            document.getElementById('logbox_0').style.zIndex = "-1";
        }
        var sosptrentrang =15;

        function resetall() {
            localStorage.removeItem('filter');
            document.getElementById("search-box").value = "";
            document.getElementById('slt1').value = ""; //Hiện ra các lựa chọn cho search nâng cao
            document.getElementById('slt2').value = "";
            document.getElementById('slt3').value = "";
        }

        function createPageSearch() {
            var s = "";
            var productarray = JSON.parse(localStorage.getItem('filter'));
            var tongsosp = (productarray.length); //Tính tổng số sản phẩm trong local filter
            var sotrang = tongsosp / sosptrentrang; //Tính số trang
            if (Math.ceil(sotrang) == 1) {
                document.getElementById('trang').innerHTML = s; //Nếu số trang bằng 1 thì không cần hiện số
            } else {
                for (var i = 0; i < Math.ceil(sotrang); i++) {
                    s += '<a  class="sp" href="#" onclick="chuyenPageSearch(' + (i + 1) + ')">' + (i + 1) + '</a>'; //Tạo thanh phân trang (các số để bấm)
                }

                document.getElementById('trang').innerHTML = s;
            }
        }

        function chuyenPageSearch(obj) {
            var vttrang = parseInt(obj);
            var s = "";
            var productarray = JSON.parse(localStorage.getItem('filter'));
            var vtbatdau = (sosptrentrang * vttrang) - sosptrentrang; //Tìm vị trí bắt đầu của sản phẩm dựa trên vị trí trang (obj là vị trí trang) VD:số trang là 1 ==> (12*1)-12=0 ==> lấy sản phẩm bắt đầu từ vị trí 0 của local filter
            for (var i = 0; i < sosptrentrang; i++) {
                if (!productarray[vtbatdau]) break; //Tránh lỗi inner lại các sản phẩm đã có khi trang chưa đủ 12 sản phẩm mà đã hết biến trong local filter
                let str = productarray[vtbatdau].price.toLocaleString('vi-VN', {minimumFractionDigits: 0, maximumFractionDigits: 3});
                s += '<a href="#" class="card" onclick="themVaoGioHang(' + productarray[vtbatdau].product + ')"><div style="position:absolute;color:black;margin-top:5px;margin-left:5px"><i>' + productarray[vtbatdau].product + 
                '</i></div><div class="addtocart" style="font-size:16px;position:absolute;height:30px;width:150px;border-radius:5px;margin:440px 60px;background-color:#787777;color:white;padding:5px";>Thêm vào giỏ hàng</div><img src="' + productarray[vtbatdau].img + '" style="width: 100%;height: 300px"/><div style="margin-top:10px;font-size:16px;color:black;font-weight:400"><p>' + productarray[vtbatdau].name + '</p></div><div class="price" style="margin-top:0px;color:black;font-size:16px;font-weight:bold">' + str + 'đ</div></a>';
                vtbatdau++;
            }
            document.getElementById('ndu').innerHTML = s; //inner từng sản phẩm vào (kèm hình tên....)
        }

        function createPageSearch1() { //Tương tự như search cơ bản, nhưng lấy biến từ local filter2 (thông tin đã các sản phầm tìm đc qua search nâng cao)
            var s = "";
            var productarray = JSON.parse(localStorage.getItem('filter2'));
            var tongsosp = (productarray.length);
            var sotrang = tongsosp / sosptrentrang;
            if (Math.ceil(sotrang) == 1) {
                document.getElementById('trang').innerHTML = s;
            } else {
                for (var i = 0; i < Math.ceil(sotrang); i++) {
                    s += '<a  class="sp" href="#" onclick="chuyenPageSearch1(' + (i + 1) + ')">' + (i + 1) + '</a>';
                }

                document.getElementById('trang').innerHTML = s;
            }
        }

        function chuyenPageSearch1(obj) { //Tương tự như search cơ bản, nhưng lấy biến từ local filter2 (thông tin đã các sản phầm tìm đc qua search nâng cao)
            var vttrang = parseInt(obj);
            var s = "";
            var productarray = JSON.parse(localStorage.getItem('filter2'));
            var vtbatdau = (sosptrentrang * vttrang) - sosptrentrang;
            for (var i = 0; i < sosptrentrang; i++) {
                if (!productarray[vtbatdau]) break;
                let str = productarray[vtbatdau].price.toLocaleString('vi-VN', {minimumFractionDigits: 0, maximumFractionDigits: 3});
                s += '<a href="#" class="card" onclick="themVaoGioHang(' + productarray[vtbatdau].product + ')"><div style="position:absolute;color:black;margin-top:5px;margin-left:5px"><i>' + productarray[vtbatdau].product + 
                '</i></div><div class="addtocart" style="font-size:16px;position:absolute;height:30px;width:150px;border-radius:5px;margin:440px 60px;background-color:#787777;color:white;padding:5px";>Thêm vào giỏ hàng</div><img src="' + productarray[vtbatdau].img + '" style="width: 100%;height: 300px"/><div style="margin-top:10px;font-size:16px;color:black;font-weight:400"><p>' + productarray[vtbatdau].name + '</p></div><div class="price" style="margin-top:0px;color:black;font-size:16px;font-weight:bold">' + str + 'đ</div></a>';
                vtbatdau++;
            }
            document.getElementById('ndu').innerHTML = s;
        }

        function searchFunction() { //Hàm search cơ bản
            var temp;
            document.getElementById('slt1').value = "";
            document.getElementById('slt2').value = "";
            document.getElementById('slt3').value = "";
            localStorage.removeItem('filter'); //Xóa localstorage của lọc thông tin sản phẩm lấy ra từ search
            var productarray = [];
            var input = document.getElementById("search-box");
            var filter = input.value.toUpperCase();
            var tempArr = JSON.parse(localStorage.getItem('products'));
            for (var i = 0; i < tempArr.length; i++) {
                temp = tempArr[i].name.toUpperCase();
                if (temp.indexOf(filter) > -1) { //Kiểm tra có sự xuất hiện của biến filter trong temp không
                    productarray.push(tempArr[i]);
                }
            }
            if (localStorage.getItem('filter') == null) {
                localStorage.setItem('filter', JSON.stringify(productarray)); //Lưu thông tin các sản phậm search được
            }
            createPageSearch(); //Tạo thanh phân trang của search
            chuyenPageSearch(1); //Hàm giúp chuyển page cho search
        }
        var pricetemp = "";
        var genderc = "";
        var brandc = "";

        function searchF(obj) { //Search nâng cao
            localStorage.removeItem('filter2');
            var productarray = [];
            var temp;
            var productarray1 = [];
            var tempArrs = JSON.parse(localStorage.getItem('products'));
            for (var i = 0; i < tempArrs.length; i++) {
                productarray1.push(tempArrs[i]);
            }
            if (localStorage.getItem('filter') == null) {
                localStorage.setItem('filter', JSON.stringify(productarray1)); //Lưu thông tin các sản phậm search được
            }
            var tempArr = JSON.parse(localStorage.getItem('filter'));
            var s = "";
            checkforFilter(obj); //Check giá trị của input r gán vào cái biến để lọc
            for (var i = 0; i < tempArr.length; i++) {
                if ((tempArr[i].gender == genderc && tempArr[i].brand == brandc) || (tempArr[i].gender == genderc && brandc == "") || (genderc == "" && tempArr[i].brand == brandc) || (genderc == "" && brandc == "")) { //Lọc theo giới tính, nhãn hàng
                    if (pricetemp == "") //Lọc theo khoảng giá
                        productarray.push(tempArr[i]);
                    if (pricetemp == "a")
                        if (tempArr[i].price < 1000000) {
                            productarray.push(tempArr[i]);
                        }
                    if (pricetemp == "c")
                        if (tempArr[i].price > 2000000) {
                            productarray.push(tempArr[i]);
                        }
                    if (pricetemp == "b")
                        if (tempArr[i].price >= 1000000 && tempArr[i].price <= 2000000) {
                            productarray.push(tempArr[i]);
                        }
                }
            }
            if (localStorage.getItem('filter2') == null) {
                localStorage.setItem('filter2', JSON.stringify(productarray));
            }
            createPageSearch1();
            chuyenPageSearch1(1);
        }

        function checkforFilter(obj) {
            switch (document.getElementById(obj).value) {
                case 'male':
                    genderc = "man";
                    break;
                case 'female':
                    genderc = "woman";
                    break;
                case 'kid':
                    genderc = "kid";
                    break;
                case 'kid':
                    genderc = "kid";
                    break;
                case 'ao':
                    brandc = "ao";
                    break;
                case 'quan':
                    brandc = "quan";
                    break;
                case 'set':
                    brandc = "set";
                    break;
                case '110':
                    pricetemp = "a";
                    break;
                case '110200':
                    pricetemp = "b";
                    break;
                case '200':
                    pricetemp = "c";
                    break;
                case '':
                    if (obj == "slt3") pricetemp = "";
                    if (obj == "slt1") brandc = "";
                    if (obj == "slt2") genderc = "";
                    break;
                default:
                    break;
            }
        }



        function themVaoGioHang(obj) { //Thêm vào biến local giỏ hàng
            if (localStorage.getItem('buybyuser') == null) { //Phải đăng nhập mới có thể thêm vào giỏ hàng sản phẩm
                alert("Vui lòng đăng nhập trước!");
                return 0;
            }
            if (localStorage.getItem('cart') == null) {
                var cartarray = [];
                localStorage.setItem('cart', JSON.stringify(cartarray));
            }
            var tempArr = JSON.parse(localStorage.getItem('cart'));
            var temp = obj;
            var productArray = JSON.parse(localStorage.getItem('products'));
            for (var i = 0; i < productArray.length; i++) {
                if (temp == productArray[i].product) tempArr.push(productArray[i]);
            }
            localStorage.setItem('cart', JSON.stringify(tempArr));
            alert('Đã thêm sản phẩm vào giỏ hàng')
        }
        // function xemChiTiet(obj) { //Xem chi tiết sản phẩm
        //     var productArray = JSON.parse(localStorage.getItem('products')); //Lấy mảng sản phẩm từ localStorage
        //     var temp = obj; //Lấy tên sản phẩm từ tham số
        //     var product; //Biến để lưu sản phẩm tìm thấy
        //     for (var i = 0; i < productArray.length; i++) { //Duyệt qua mảng sản phẩm
        //       if (temp == productArray[i].product) { //Nếu tên sản phẩm trùng khớp
        //         product = productArray[i]; //Lưu sản phẩm vào biến product
        //         break; //Thoát khỏi vòng lặp
        //       }
        //     }
        //     if (product) { //Nếu có tìm thấy sản phẩm
        //       window.location.href = "#"; //Chuyển sang trang hiển thị thông tin sản phẩm
        //       localStorage.setItem('currentProduct', JSON.stringify(product)); //Lưu sản phẩm hiện tại vào localStorage
        //     } else { //Nếu không tìm thấy sản phẩm
        //       alert("Không có sản phẩm này!"); //Hiển thị thông báo lỗi
        //     }
        //   }
        function chuyenPageFilter(obj) {
            var vttrang = parseInt(obj);
            var s = "";
            var productarray = JSON.parse(localStorage.getItem('arrBrand'));
            var vtbatdau = (sosptrentrang * vttrang) - sosptrentrang;
            for (var i = 0; i < sosptrentrang; i++) {
                if (!productarray[vtbatdau]) break;
                let str = productarray[vtbatdau].price.toLocaleString('vi-VN', {minimumFractionDigits: 0, maximumFractionDigits: 3});
                s += '<a href="#" class="card" onclick="themVaoGioHang(' + productarray[vtbatdau].product + ')"><div style="position:absolute;color:black;margin-top:5px;margin-left:5px"><i>' + productarray[vtbatdau].product + 
                '</i></div><div class="addtocart" style="font-size:16px;position:absolute;height:30px;width:150px;border-radius:5px;margin:440px 60px;background-color:#787777;color:white;padding:5px";>Thêm vào giỏ hàng</div><img src="' + productarray[vtbatdau].img + '" style="width: 100%;height: 300px"/><div style="margin-top:10px;font-size:16px;color:black;font-weight:400"><p>' + productarray[vtbatdau].name + '</p></div><div class="price" style="margin-top:0px;color:black;font-size:16px;font-weight:bold">' + str + 'đ</div></a>';
                vtbatdau++;
            }
            document.getElementById('ndu').innerHTML = s;
        }

        function createPageFilter() {
            var s = "";
            var productarray = JSON.parse(localStorage.getItem('arrBrand'));
            var tongsosp = (productarray.length);
            var sotrang = tongsosp / sosptrentrang;
            if (Math.ceil(sotrang) == 1) {
                document.getElementById('trang').innerHTML = s;
            } else {
                for (var i = 0; i < Math.ceil(sotrang); i++) {
                    s += '<a  class="sp" href="#" onclick="chuyenPageFilter(' + (i + 1) + ')">' + (i + 1) + '</a>';
                }

                document.getElementById('trang').innerHTML = s;
            }
        }

        function chuyenPage() { //Hàm dùng để chuyển trang inner dữ liệu trang vào
            var url = window.location.href;
            var id = url.split('?');
            var idd = parseInt(id[1]); //cắt ra từ url để phân trang inner dữ liệu
            var s = "";
            var productarray = JSON.parse(localStorage.getItem('products'));
            var vtbatdau = (sosptrentrang * idd) - sosptrentrang;
            for (var i = 0; i < sosptrentrang; i++) {
                if (!productarray[vtbatdau]) break;
                let str = productarray[vtbatdau].price.toLocaleString('vi-VN', {minimumFractionDigits: 0, maximumFractionDigits: 3});
                s += '<a href="#" class="card" onclick="themVaoGioHang(' + productarray[vtbatdau].product + ')"><div style="position:absolute;color:black;margin-top:5px;margin-left:5px"><i>' + productarray[vtbatdau].product + 
                '</i></div><div class="addtocart" style="font-size:16px;position:absolute;height:30px;width:150px;border-radius:5px;margin:440px 60px;background-color:#787777;color:white;padding:5px";>Thêm vào giỏ hàng</div><img src="' + productarray[vtbatdau].img + '" style="width: 100%;height: 300px"/><div style="margin-top:10px;font-size:16px;color:black;font-weight:400"><p>' + productarray[vtbatdau].name + '</p></div><div class="price" style="margin-top:0px;color:black;font-size:16px;font-weight:bold">' + str + 'đ</div></a>';
                vtbatdau++;
            }
            document.getElementById('ndu').innerHTML = s;
        }

        function createPage() { //Khởi tạo tính toán số trang và nút chuyển trang
            var s = "";
            var productarray = JSON.parse(localStorage.getItem('products'));
            var tongsosp = (productarray.length);
            var sotrang = tongsosp / sosptrentrang;
            if (Math.ceil(sotrang) == 1) { //Số trang =1 thì khỏi tạo nút bấm
                document.getElementById('trang').innerHTML = s;
            } else {
                for (var i = 0; i < Math.ceil(sotrang); i++) { //Math.ceil để làm tròn lên số trang
                    s += '<a  class="sp" href="content.html?' + (i + 1) + '" onclick="chuyenPage()">' + (i + 1) + '</a>';
                }

                document.getElementById('trang').innerHTML = s;
            }
        }





        function brand(obj) { //Lấy dữ liệu để lọc dữ liệu theo Brand
            var s = "";
            localStorage.removeItem('filter');
            document.getElementById("search-box").value = "";
            document.getElementById('slt1').value = ""; //Hiện ra các lựa chọn cho search nâng cao
            document.getElementById('slt2').value = "";
            document.getElementById('slt3').value = "";
            localStorage.removeItem("arrBrand"); //Xóa local để reset lại cho mỗi lần lọc
            var tempBrand = [];
            if (localStorage.getItem('arrBrand') == null) {
                tempBrand = [];
                localStorage.setItem('arrBrand', JSON.stringify(tempBrand));
            }
            var tempArr = JSON.parse(localStorage.getItem('arrBrand'));
            var brandname = obj;
            var productArray = JSON.parse(localStorage.getItem('products')); //Lấy dữ liệu từ local để check với local arrBrand
            for (var i = 0; i < productArray.length; i++)
                if (productArray[i].brand == brandname) {
                    tempArr.push(productArray[i]);
                }
            localStorage.setItem('arrBrand', JSON.stringify(tempArr));
            createPageFilter();
            chuyenPageFilter(1);
        }

        function gender(obj) { //Lấy dữ liệu để lọc dữ liệu theo Gender
            var s = "";
            localStorage.removeItem('filter');
            document.getElementById("search-box").value = "";
            document.getElementById('slt1').value = ""; //Hiện ra các lựa chọn cho search nâng cao
            document.getElementById('slt2').value = "";
            document.getElementById('slt3').value = "";
            localStorage.removeItem("arrBrand"); //Xóa local để reset lại cho mỗi lần lọc
            var tempBrand = [];
            if (localStorage.getItem('arrBrand') == null) {
                tempBrand = [];
                localStorage.setItem('arrBrand', JSON.stringify(tempBrand));
            }
            var tempArr = JSON.parse(localStorage.getItem('arrBrand'));
            var gender = obj;
            var productArray = JSON.parse(localStorage.getItem('products')); //Lấy dữ liệu từ local để check với local arrBrand
            for (var i = 0; i < productArray.length; i++)
                if (productArray[i].gender == gender) {
                    tempArr.push(productArray[i]);
                }
            localStorage.setItem('arrBrand', JSON.stringify(tempArr)); //Đẩy tempArr vào local arrBrand

            createPageFilter();
            chuyenPageFilter(1);

        }


        function pageAll() {
            createPage();
            chuyenPage();

        }



        function createProducts() {
            var productarray = [];
            if (localStorage.getItem('products')== null) {
                productarray = [
                    { product: 1001, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/400/2023/09/16/94c460cb7921bac2e87f9d0751b3206d.JPG', name: 'Đầm Lụa Xếp Cổ 2 Ve', price: 2490000 },
                    { product: 1002, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/09/07/6fb23d64f25936252d0e0753bcc6a249.JPG', name: 'CHÂN VÁY ORGANZA XẾP LY', price: 1090000 },
                    { product: 1003, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/10/05/d365cfb53c79ad91a682649106d949d4.JPG', name: 'Chân Váy Đuôi Cá Tà Lệch Lớp', price: 1150000 },
                    { product: 1004, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/08/07/03281683f39ca1d9de24f44cde75c8de.jpg', name: 'Chân Váy Đuôi Cá Tà Lệch Lớp', price: 850000 },
                    { product: 1005, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/400/2023/08/16/2be6a29cbe9e119e6f7f457c6735c352.JPG', name: 'Zuýp 2 Lớp Xếp Ly Bản Lớn', price: 1190000 },
                    { product: 1006, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/04/20/1126ad04a5e78ca1c47f4d4ed4135f8f.jpg', name: 'CHÂN VÁY CHIẾT LY CHÉO TRƯỚC', price: 950000 },
                    { product: 1007, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/05/12/4409b583676402600691b454908d6723.jpg', name: 'Chân Váy Ren Xếp Ly', price: 850000 },
                    { product: 1008, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/400/2023/07/20/9be1fab1520bc110a91bd62e3b6c7ce3.JPG', name: 'Chân Váy Xếp Ly Cạp Cao Phối Khuy', price: 1350000 },
                    { product: 1009, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/05/12/a9f60a5c7240a7d34f8fb7a81fccbba4.jpg', name: 'Chân Váy Xếp Ly Cạp Cao Phối Khuy', price: 1350000 },
                    { product: 1010, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/04/17/13a20903f548616b199c9caa4238e4b3.jpg', name: 'Chân Váy Ren Xếp Ly', price: 850000 },
                    { product: 1011, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/05/12/e4be8831256367ca4504c98b923fa02c.jpg', name: 'Chân Váy Ren 3 Lớp', price: 1390000 },
                    { product: 1012, gender: 'woman', brand: 'ivy', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/04/03/09c34ccc8754f937233800f2d143a5aa.jpg', name: 'Chân Váy Xếp Ly Dáng Suông', price: 1090000 },
                    { product: 1013, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/08/22/bcafe37923807a167d2d2ceb78c8ac6c.JPG', name: 'CHÂN VÁY REN 3 LỚP', price: 1390000 },
                    { product: 1014, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/400/2023/05/12/64daf045b03e3c380c328168e489c43c.jpg', name: 'Chân Váy Midi Đắp Vạt Chéo', price: 890000 },
                    { product: 1015, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/06/16/9a5b6bc406e805a726d16904c71ee9d3.JPG', name: 'CHÂN VÁY LỤA XẾP LY DÁNG DÀI', price: 1490000 },
                    { product: 1016, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/12/30/4bbac4ab9a9087f9acfa5e3c441cbcea.jpg', name: 'CHÂN VÁY KHAKI DÁNG XÒE', price: 1090000 },
                    { product: 1017, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/08/29/2f4541d1acc5c67723523be11c7980af.jpg', name: 'CHÂN VÁY LỤA XẾP LY 2 LỚP', price: 1190000},
                    { product: 1018, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/08/18/b15fdbd99358ba69e8db6b29dd7e1651.jpg', name: 'CHÂN VÁY LỤA XẾP LY 2 LỚP', price: 1190000 },
                    { product: 1018, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/07/18/2068040b3ce9167b7cdba36c8f5bce1f.jpg', name: 'ZUÝP BÚT CHÌ 2 LỚP', price: 790000 },



                    { product: 1019, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/07/18/f960a6dcba28331bcdaf2493d9a493f4.jpg', name: 'ZUÝP BÚT CHÌ', price: 790000 },

                    { product: 1020, gender: 'woman', brand: 'set', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/09/25/cb5958fc16da9cfa5d9724147fe58d69.JPG', name: 'CALISTA SET - BỘ VEST ĐAI EO', price: 2490000 },
                    { product: 1021, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/08/07/ef0ff8ec6e924a981d087fc30a22dea6.jpg', name: 'ZUÝP XÒE RÚT EO', price: 1090000 },

                    { product: 1022, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/08/16/eb36f523de15af6b9112db2aa322f0af.JPG', name: 'ZUÝP 2 LỚP XẾP LY BẢN LỚN', price: 1190000 },

                    { product: 1023, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/03/21/e5d337aa2ad7f994a507778c310bfa48.jpg', name: 'CHÂN VÁY TAPTA 2 LỚP', price: 790000 },

                    { product: 1024, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/05/12/76c4946164fcc19ff861b71c516db319.jpg', name: 'CHÂN VÁY TAPTA 2 LỚP', price: 790000 },

                    { product: 1025, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/12/30/20292e3a99bdd1cdbc2b1dd124a386eb.jpg', name: 'Chân Váy Xòe Phối Phụ Kiện', price: 890000 },
                    { product: 1026, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/11/17/06e34992dde168088af05efbe805fb13.jpeg', name: 'CHÂN VÁY KHAKI DÁNG XÒE', price: 1090000 },

                    { product: 1027, gender: 'woman', brand: 'set', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/12/02/c04393928dc01702cb66580fedebff76.jpg', name: 'Party Skirt - Chân Váy Tweed Lấp Lánh', price: 1190000 },

                    { product: 1028, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/10/10/2d6059ff3d8ad672e11ea23e07b6129e.jpeg', name: 'CHÂN VÁY TWEED PHỐI SỌC', price: 1150000 },

                    { product: 1029, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/07/14/65ba7c96a997a7d5773d850033b5cb9b.jpg',name:'VIVIAN DRESS - ZUÝP LEN LƯỚI' ,price: 1390000 },

                    { product: 1030, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/01/16/e1884c1c4e07afb2052b4ff16afa7240.jpg', name: 'ĐẦM XÒE TAY PHỒNG CÁCH ĐIỆU', price: 1690000 },

                    { product: 1031, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/12/30/15d2bd4915d66d5faa198ef022f66826.jpg', name: 'ĐẦM THUN NHÚM VAI', price: 1490000 },
                    { product: 1032, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/12/30/bbc3987f6525616dc86d5014bc072445.jpg', name: 'Đầm Nhung Dáng Bí Ngô', price: 2590000 },
                    { product: 1033, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/11/01/da600f4090958268422cf670b1e9f605.jpg', name: 'ALMIRA DRESS - ĐẦM ĐÍNH HOA NỔI TAY CAPE', price: 2690000 },

                    { product: 1034, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/03/14/7fd41150ad61c673697d6e8284e50f66.JPG', name: 'Đầm Lụa Xếp Tay Dài', price: 1790000 },

                    { product: 1035, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/08/19/47aadb7e6dd83111767c90d7f04df5ff.jpg', name: 'ĐẦM XÒE HẠ EO XẾP LY', price: 2290000 },

                    { product: 1036, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/10/12/03e83457f85d8d0364c68df9f5db6d58.jpg', name: 'LILY DRESS - ĐẦM XÒE TAY LỠ ĐÍNH HOA', price: 2890000 },

                    { product: 1037, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/12/06/3ac47428bb9b73c0c2d6c2ea30b7d4a7.jpg', name: 'ĐẦM MAXI LỤA KÈM ĐAI', price: 2290000 },

                    { product: 1038, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/09/07/7010e7a3f092ddc10c0d12b146859672.JPG', name: 'DESI DRESS - ĐẦM THU BÁN NGUYỆT', price: 1690000 },

                    { product: 1039, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/04/20/a894630a4ea2bfc9d09920102ec4d9fe.jpg', name: 'ĐẦM TRỄ VAI DÁNG XÒE', price: 3490000 },

                    { product: 1040, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/09/08/f7658a95a623d4af7849ceabbcd7944c.JPG', name: 'TINA DRESS - ĐẦM THU TAY DÀI LỚP', price: 2590000 },

                    { product: 1041, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/07/20/1b0e624de4f45aa11c25b0586ce87ac0.JPG', name: 'ÁO PEPLUM XẺ TÀ', price: 1350000 },

                    { product: 1042, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/06/16/24d3c53a696a8a2c5a4a7380e84e0511.JPG', name: 'ÁO PEPLUM XẺ TÀ', price: 675000 },
                    { product: 1043, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/05/12/35b717a09123d472740dd85cfc7e9ca0.jpg', name: 'ÁO PEPLUM PHỐI REN', price: 1490000 },
                    { product: 1044, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/07/20/69eb9550833d4eb233b0bf6cb7a083b0.JPG', name: 'ÁO PEPLUM PHỐI REN', price: 1490000 },

                    { product: 1045, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/11/29/9927fb3086036ddb3218efe0e8814b2d.jpg ', name: 'ÁO THUN PEPLUM DẬP LỖ TẠO KIỂU', price: 850000 },

                    { product: 1046, gender: 'woman', brand: 'set', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/06/29/441b605bd294582ff4e4974542810602.JPG', name: 'SET ÁO LINEN DÁNG PEPLUM VÀ QUẦN SOOC', price: 594000 },

                    { product: 1047, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2021/11/05/3625ee36814ab4710c1bab70576d792b.JPG', name: 'BLACK DIAMOND TOP', price: 1690000 },

                    { product: 1048, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2021/07/20/b3e48d1c4883832bf32095e535bc20e1.JPG', name: 'ÁO 2 DÂY HỌA TIẾT', price: 590000 },

                    { product: 1049, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/400/2021/08/06/acf020437b84607435219c982e0b5e38.JPG', name: 'Áo Peplum Cổ Cách Điệu', price: 890000 },

                    { product: 1050, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2021/07/02/fc7b6d8908511d27b185559cb6a0c82a.JPG', name: 'ÁO 2 DÂY XẾP LY', price: 1090000 },
                    { product: 1051, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/01/12/a94fe3d1e35ab3ad41408f8dc403a6dc.jpg', name: "ÁO BLAZER DẠ HỌA TIẾT KẺ", price: 1890000 },
                    { product: 1053, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/01/26/8b0d5d1188284c0af5936026601ede2e.JPG', name: "ÁO KHOÁC DẠ DÁNG DÀI", price: 2990000 },
                    { product: 1054, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/05/15/5ab029fe4058b6d502ba228ee94b1d9e.JPG', name: "Đầm Len Móc Lưới", price: 1590000 },
                    { product: 1055, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/05/08/b4f98005980a05e93219dae905792d99.jpg', name: "SEASIDE CHIC - ĐẦM XÒE CỔ YẾM PHỐI BÈO", price: 1495000 },
                    { product: 1056, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/12/10/c4e6a6d6ba2134288eec7cdd235a7684.jpg', name: 'ĐẦM LỤA CỔ XẺ THẮT NƠ', price: 895000 },
                    { product: 1057, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/12/07/642c89cba92c3bf2211114d39531bbb2.jpg', name: 'ĐẦM MAXI LỤA PHỐI ĐAI', price: 1145000 },
                    { product: 1058, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/11/29/da0d65a0df891fd568940037dc0a3659.jpg', name: 'ĐẦM LỤA THÊU HOA DÁNG XÒE', price: 717000 },
                    { product: 1059, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/07/18/5e80a19a501e941a300ffeb01d7a4cf2.JPG', name: 'ĐẦM THIẾT KẾ BALLOON', price: 1790000 },
                    { product: 1060, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/06/06/b682025126eb0e43662eeef853a50536.jpg', name: 'ĐẦM KHÔNG TAY PHỐI LY NHỎ', price: 1690000 },
                    { product: 1061, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/07/10/ead8043b4dda6f94a699a788615dbf6d.jpg', name: 'QUẦN BAGGY PHỐI ĐAI', price: 1290000 },
                    { product: 1062, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/04/26/cf759da97fac4f587731973ca049a384.JPG', name: 'PHOEBE DRESS - ĐẦM LỤA XẾP LY NHỎ', price: 2490000 },
                    { product: 1063, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/05/20/2a463ecced08ab75531777c4a9323942.JPG', name: 'PHOEBE DRESS - ĐẦM LỤA XẾP LY NHỎ', price: 2490000 },
                    { product: 1064, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/04/21/fafeb8ade0e673e0ececb78e830aa4cb.JPG', name: 'FLORAL DRESS - ĐẦM HOA LỤA', price: 2190000 },
                    { product: 1065, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/03/04/8e35a5c86b5eb58445ae1db3053cc598.JPG', name: 'ĐẦM HỌA TIẾT CUT-OUT', price: 2490000 },
                    { product: 1066, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2021/08/06/484fba45c9ddb3cd88b2fea37274ede7.JPG', name: 'ĐẦM XÒE HOA NHÍ', price: 1690000 },
                    { product: 1067, gender: 'woman', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2021/07/22/c9dd06f47c10e1cb186b9b326444d6b7.JPG", name: "ĐẦM XÒE HỌA TIẾT", price: 1690000 },
                    { product: 1068, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2021/07/22/9fe117ecbe9b422f61803ea2d2f10876.JPG', name: 'ĐẦM VOAN ĐUÔI CÁ', price: 1690000 },
                    { product: 1069, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/09/07/0d867b2d5e22934a35f0d217adeb5451.JPG', name: 'Helen Dress - Đầm Lụa 2 Lớp', price: 1790000 },
                    { product: 1070, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/09/07/7010e7a3f092ddc10c0d12b146859672.JPG', name: 'DESI DRESS - ĐẦM THU BÁN NGUYỆT', price: 1690000 },
                    { product: 1071, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/09/16/4d4f1a7ba8d9672867c83fc2e4ef5317.JPG', name: 'QUẦN SUÔNG ĐÍNH KHUY SƯỜN', price: 1190000 },
                    { product: 1072, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/07/20/c8c026a7142cc648f24a6843c9401b14.JPG', name: 'DAISY DRESS - ĐẦM KẾT HOA NHẸ NHÀNG', price: 1890000 },
                    { product: 1073, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/08/16/e5a53b7920475aefb72025089ee0e30a.JPG', name: 'ÁO KIỂU CỔ V PHỐI KHUY', price: 990000 },
                    { product: 1074, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/08/16/85f2c8d7e8f43fb14999ee2e2f7d58be.JPG', name: 'ĐẦM DÀI PHỐI TÚI KÈM ĐAI', price: 1990000 },
                    { product: 1075, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/07/20/a731a73d69fccbebbb341a0e16a54887.JPG', name: 'ĐẦM TAPTA TAY CAPE', price: 3490000 },
                    { product: 1076, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/03/06/7d033457fe2c22b9e240ad1027041852.jpg', name: 'ÁO SƠ MI LỤA PHỐI PHỤ KIỆN', price: 1090000 },
                    { product: 1077, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/09/16/e84d3542a8dc6806cabd812ea9eecdd7.JPG', name: 'CAILY DRESS - ĐẦM THUN CUT OUT', price: 1490000 },
                    { product: 1078, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/12/30/de8d99ebae6267cf8b272ecc9d3927a3.jpg', name: 'ÁO LỤA CỔ ĐỔ', price: 950000 },
                    { product: 1079, gender: 'woman', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/09/16/0e37653a0238654a60aa8acdcb8b9d27.JPG', name: 'ÁO SƠ MI LỤA THẮT NƠ', price: 1150000 },
                    { product: 1080, gender: 'woman', brand: 'quan', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/09/07/f5c9791126ea311ea140f8805f3ce8f7.JPG', name: 'QUẦN BAGGY PHỐI ĐAI', price: 1290000 },
                    { product: 1081, gender: 'man', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/400/2023/08/31/dec33d9a9c06de03abc34f9099c44e8d.JPG', name: 'Áo sơ mi Khaki Regular fit', price: 1290000 },
                    { product: 1082, gender: 'man', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/09/27/c944a6085cfdbd991b4460a7d5baf6f9.jpg', name: 'Long sleeve - Áo thun tay dài', price: 890000 },
                    { product: 1083, gender: 'man', brand: 'set', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/09/25/d8c4d6d4a86a6756a513a930294b9f97.jpg', name: 'Set bộ nỉ kéo khóa (kèm quần)', price: 2540000 },
                    { product: 1084, gender: 'man', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/09/25/581c3b8744407ddf9854c602925542da.jpg', name: 'Basil Polo Supima -', price: 990000 },
                    { product: 1085, gender: 'man', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/08/09/1075ef981f6e35a9b7022298b6c1a8b8.jpg', name: 'Áo Supima Basic Slim fit', price: 699000 },
                    { product: 1086, gender: 'man', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/09/26/0d6c85d306903587ef523cf8051a66f1.JPG', name: 'Hoodie chữ M', price: 950000 },
                    { product: 1087, gender: 'man', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/07/17/5be04d9a0932f8aa233cdeb131e624d8.JPG', name: 'Áo thun Supima Sailing boat', price: 750000 },
                    { product: 1088, gender: 'man', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/08/31/5228905c82720731429dee5636ad6008.JPG', name: 'Áo khoác gió có mũ', price: 1690000 },
                    { product: 1089, gender: 'man', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/08/09/5d4afd6fda0590a05a638f4cde9a0753.jpg', name: 'Áo Polo cổ kiểu', price: 950000 },
                    { product: 1090, gender: 'man', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/08/09/a982e0b172726c52bc298b50631fc072.jpg', name: 'Áo Polo phối kẻ đen', price: 890000 },
                    { product: 1091, gender: 'man', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/08/09/4f06c559d2fba06d568b386504ad5759.jpg', name: 'Áo sơ mi Regular tay dài', price: 1250000 },
                    { product: 1092, gender: 'man', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/08/17/9c45e8649e2ac1c786b20e4bcb218a57.JPG', name: 'Otis Polo - Áo Polo phối màu', price: 850000 },
                    { product: 1093, gender: 'man', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/04/24/6c330a36e5dfa35b4c7d9d6e9da9e805.JPG', name: 'Áo sơ mi thêu logo Metagent', price: 1390000 },
                    { product: 1094, gender: 'man', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/04/17/6500610653306c30c067f36f9f310df1.jpg', name: 'Áo sơ mi trắng basic', price: 1290000 },
                    { product: 1095, gender: 'man', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/01/05/036c29537e1b00223b3e973a90282bd4.JPG', name: 'Suede Jacket - Áo khoác sơ mi da lộn', price: 2249000 },
                    { product: 1096, gender: 'man', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/01/05/823b94e49db87cbdd5ec3c7ebd6fd087.JPG', name: 'Suede Jacket - Áo khoác sơ mi da lộn', price: 2249000 },
                    { product: 1097, gender: 'man', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/01/05/62e29b299ef73a574dec507c729ffb00.JPG', name: 'Áo sơ mi họa tiết kẻ', price: 1350000 },
                    { product: 1098, gender: 'man', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/01/05/814d9c518435a0d46b97233d9e7fb0f4.JPG", name: "Áo Polo thêu họa tiết", price: 553000},
                    { product: 1099, gender: 'man', brand: 'ao', img: 'https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/02/23/d0ddcae95c7c1a6440d3b203b7c8c54d.jpg', name: 'Áo khoác Bomber dạ đính logo', price: 1990000 },
                    { product: 1100, gender: 'man', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/04/24/4be67e40e85f1914eb4a7d4f2f981a5c.JPG", name: "Áo sơ mi khaki dáng regular", price: 1190000 },
                    { product: 1111, gender: 'man', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/12/07/e823771b6e56c6870572ca8fb13bca8d.jpg", name: "Set áo hoodie nỉ và quần", price: 2680000 },
                    { product: 1112, gender: 'man', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2023/08/31/9e3e27746db320aef7584f072309f4eb.JPG", name: "Áo len cổ cao kéo khóa MS 58E3168", price: 1190000 },
                    { product: 1113, gender: 'man', brand: 'set', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/12/15/02bd5a8383a243395fb02882c6b8bfb1.jpg", name: "Set áo hoodie nỉ và quần", price: 2680000 },
                    { product: 1114, gender: 'man', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/02/23/22a20fe268a193dbf1e7dbfa6f39f91e.jpg", name: "Áo len cổ cao kéo khóa MS 58E3168", price: 1190000 },
                    { product: 1115, gender: 'man', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/02/16/97dcda3e38b440eb61442f3ab1f6c0af.jpg", name: "Áo len basic dáng regular fit", price: 1190000 },
                    { product: 1116, gender: 'man', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/11/08/2ecd7336e4d0ac141275461db0284648.jpg", name: "Áo thun dài tay Conscious MS 58E3606", price: 1090000 },
                    { product: 1117, gender: 'man', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/11/14/ad6c20ee7fdbeb591ee2f7e9d1d14d49.jpg", name: "Áo sơ mi dạ flannel MS 17E3617", price: 1590000 },
                    { product: 1118, gender: 'man', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/10/11/6fdd0be1e02f842ce5502a5c6dd60d34.jpg", name: "Áo len ngắn tay MS 57E3172", price: 1090000 },
                    { product: 1119, gender: 'man', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/11/14/482dbd0233ad9f550e0577397d5bff67.jpg", name: "Áo sơ mi dạ flannel MS 17E3617", price: 1590000 },
                    { product: 1120, gender: 'man', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/11/14/6b304321cc4bb65b30e9117a538995a8.jpg", name: "Áo khoác da lộn dáng regular MS 70E3603", price: 2790000 },
                    { product: 1121, gender: 'man', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2023/08/11/f0e9d00757f66f4a340665acd520e1e2.jpg", name: "Quần dài Khaki Slim MS 22E3982", price: 1190000 },
                    { product: 1122, gender: 'man', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/08/11/49cd33e1087ecf662d2be5ed621510ee.jpg", name: "Quần dài Flow tex", price: 1190000 },
                    { product: 1123, gender: 'man', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2023/04/17/007575890259119d6ddfbccc7aec1d4d.jpg", price: 1190000 },
                    { product: 1124, gender: 'man', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2023/08/31/83457daa268ab6b3cd153324e68d8e33.JPG", name: "Quần Flow Tex trơn Regular fit MS 22E3821", price: 1590000 },
                    { product: 1125, gender: 'man', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/08/10/e34a7ee245072b779c72f247ad6b2656.jpg", name: "Sleeze Short - Quần Tuysi ngang đùi MS 20E3983", price: 790000 },



                    { product: 1126, gender: 'man', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/07/17/a0dabb7cfd6d3928a44c21e25c145680.JPG", name: "Urban Khaki - Quần Khaki túi sườn MS 22E3968", price:1190000 },
                    { product: 1127, gender: 'man', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/04/24/c72342c1b70718ae3ef8e4aa66023574.JPG", name: "Quần short color cạp chun", price: 595000 },
                    { product: 1128, gender: 'man', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/02/16/62d4171a53f801c66a21cfd8e21ff424.jpg", name: "Quần tây dáng regular fit MS 22E3607", price: 1590000 },
                    { product: 1129, gender: 'man', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2023/08/11/bb762fac22c7378030dd63c57366be4a.jpg", name: "Quần tây dáng slim fit MS 22E3690", price: 1590000 },
                    { product: 1130, gender: 'man', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/01/10/cfa9612954da987781d34f510d925a25.jpg", name: "Quần khaki dáng regular fit", price: 1190000 },
                    { product: 1131, gender: 'man', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/01/05/9ebc510f01e53d9bd00d2baa60d272c4.JPG", name: "Quần khaki dáng regular fit", price: 1190000 },
                    { product: 1132, gender: 'man', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/11/12/e19be8e71d55ccece2edd1d619aaf0a5.jpg", name: "Quần tây dáng slim fit MS 22E3642", price: 1390000 },
                    { product: 1133, gender: 'man', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/11/12/f9789ab7b2b9959e5fdb5f9d27c5c69b.jpg", name: "Quần thun dáng Jogger MS 22E3668", price: 890000 },
                    { product: 1134, gender: 'man', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2023/06/09/b9a74e27354d4e96c2d344f358db1626.JPG", name: "Quần tây dáng slim fit MS 22E3641", price: 1390000 },
                    { product: 1135, gender: 'man', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/10/11/d37ba0b8636964806c89152d73071a5f.jpg", name: "Quần gió thể thao MS 22E3633", price: 1190000 },
                    { product: 1136, gender: 'man', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/12/20/3a4ef003626bcca2b4121cf04edd8df0.jpg", name: "Quần gió thể thao MS 22E3633", price: 1190000 },
                    { product: 1137, gender: 'man', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/03/16/5bfffa358d59c4d8d771786f3911aeee.jpg", name: "Quần tây kẻ slim fit MS 22E3610", price: 1290000 },
                    { product: 1138, gender: 'man', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2023/01/10/f6ba0fe61fe85d12822b6315c62c31d9.jpg", name: "Quần sooc thun cạp chun MS 20E3546", price: 650000 },
                    { product: 1139, gender: 'man', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/03/15/f6b9ec35dff480cb626715355199cbf4.jpg", name: "Quần sooc thun cạp chun MS 20E3546", price: 650000 },
                    { product: 1140, gender: 'man', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/10/10/89a40f7052535ca760cef56c02e83b0e.jpg", name: "Quần sooc thun", price: 750000 },
                    { product: 1141, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2023/09/13/924e9ba57898a2a66dd2353aec33d9d8.jpg", name: "Hoodie MonDay", price: 890000 },
                    { product: 1142, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2023/09/13/4ce7ba71ecdab770551e1560ecd0daf8.jpg", name: "Áo Thun FREE STYLE", price: 399000 },
                    { product: 1143, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2023/09/15/8f2e58e4b390e368fac61cfb796cbd97.jpg", name: "Zuýp Chứ A - Túi Sườn", price: 399000 },
                    { product: 1144, gender: 'kid', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/12/13/98f59eda896448b3ef42eab318ca4964.jpg", name: "CHÂN VÁY XẾP LY BÉ GÁI", price: 410000 },
                    { product: 1145, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/09/13/ce7c4f98d2336b08629701f6be5804b3.jpg", name: "Zuýp Chứ A - Túi Sườn", price: 399000 },
                    { product: 1146, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2023/09/13/24e24f5a570d859d2e4451f9084b5f54.jpg", name: "Áo Thun Smile", price: 499000 },
                    { product: 1147, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2023/09/13/c1b6c6b7eb436e507c488a6c7743771b.jpg", name: "Đầm Thun Phối Áo Kiểu", price: 649000 },
                    { product: 1148, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2023/09/13/cc10c584d9cbfc0fd2e5be218dc2bb90.jpg", name: "Áo Thun Cherry", price: 449000 },
                    { product: 1149, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/09/13/94859bf5c9c671d38af81b50834910b6.jpg", name: "Polo Day Dream", price: 549000},
                    { product: 1150, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2023/09/13/49fee62470f9770df0e2c069f5280876.jpg", name: "Polo Day Dream", price: 549000 },
                    { product: 1151, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2023/09/13/2138cc7f71597835470da93bc67b47d1.jpg", name: "Áo Thun Paint - Có Mũ", price: 449000 },


                    { product: 1152, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/09/13/06e2314e09955bba3ab8b98662f23647.jpg", name: "Polo Day Dream", price: 549000 },
                    { product: 1153, gender: 'kid', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/09/13/83aec5755e01dbe886e996fd0d0651f2.jpg", name: "Quần Thun Túi Phối Viền", price: 400000 },
                    { product: 1154, gender: 'kid', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/09/13/ed47069ba9a8c1d60033268237201600.jpg", name: "Quần Thun Dài Bo Gấu", price: 420000 },
                    { product: 1155, gender: 'kid', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/09/15/b5d4986406505890abd2d34b2b0316c2.jpg", name: "Quần Suông Thun Gân", price: 449000 },
                    { product: 1156, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/07/10/1e09eda247a8f35cf839a2e51eb14cce.jpg", name: "Đầm Thun Polo", price: 499000 },
                    { product: 1157, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/07/10/ba86d8e9e0734c2cd694f72082c4b042.jpg", name: "Đầm Thun Polo", price: 499000 },
                    { product: 1158, gender: 'kid', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/06/13/33aff7f59bb2c16c99a304ed4175fa67.jpg", name: "Quần Sooc Regular", price: 450000 },
                    { product: 1159, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/07/10/e0275c2b1020447753a78b22272f1879.jpg", name: "Áo Thun In Chữ", price: 349000 },
                    { product: 1160, gender: 'kid', brand: 'set', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2023/07/06/54d97074599fdd4376dbb52f282354ae.jpg", name: "Set Bộ Fish", price: 720000 },
                    { product: 1161, gender: 'kid', brand: 'set', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/07/11/7d42027265d1ef0a745a04783d79d763.jpg", name: "Set Bộ Fish", price: 720000 },
                    { product: 1162, gender: 'kid', brand: 'ao', img: "hhttps://pubcdn.ivymoda.com/files/product/thumab/400/2023/06/13/bb75c2fefb429a87d2bc7546baee9f9c.jpg", name: "Đầm Polo Thêu Cute", price: 649000 },
                    { product: 1163, gender: 'kid', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/06/15/62acc91d7c9ee5b1bce8cc98732505dd.JPG", name: "Chân Váy Cam Ly 2 Lớp", price: 490000 },
                    { product: 1164, gender: 'kid', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/04/26/3ff15ae5b18fd9fb31910a56f5eaf8b0.jpg", name: "Quần Sooc Party Time", price: 349000 },
                    { product: 1165, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/06/13/33aff7f59bb2c16c99a304ed4175fa67.jpg", name: "Áo Thun Kẻ Viền", price: 399000 },
                    { product: 1166, gender: 'kid', brand: 'set', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/04/06/29d467dc63d94b095b2e50b80ca36e1d.jpg", name: "Set Thun Họa Tiết Khủng Long", price: 848000 },
                    { product: 1167, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2023/04/05/d4c3d89bc8780a4275d7a3c7e0e9147b.jpg", name: "ÁO THUN THÊU CHỮ", price: 399000 },
                    { product: 1168, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2023/04/05/75bf675324dc42707aa984a29e0c7a68.jpg", name: "Áo Polo Thêu Hình", price: 499000 },
                    { product: 1169, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2023/04/27/25dfca114f11a2b2c8e8f6f8de04501f.jpg", name: "Áo Thun By My Side", price: 399000 },
                    { product: 1170, gender: 'kid', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2023/04/05/7af518a9589b187902d2cf25eca230a1.jpg", name: "Quần Sooc Kaki Bé Trai", price: 590000 },
                    { product: 1171, gender: 'kid', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/11/24/f971c120319b2063ff7dc2c124989150.jpg", name: "Quần Sooc Khaki Giả Váy Bé Gái", price: 390000 },
                    { product: 1172, gender: 'kid', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/09/28/5c7f55c0c65d6d8a5f13aa938b0d4444.jpg", name: "Quần Sooc Giả Váy", price: 449000 },
                    { product: 1173, gender: 'kid', brand: 'set', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/07/01/53b7fe9e43016ebf94764fb4b1529862.JPG", name: "Set Áo 2 Dây Phối Bèo Xếp Tầng", price: 840000 },
                    { product: 1174, gender: 'kid', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/10/06/465d2679e1c86a58574e348370ffe2c6.JPG",name:"Quần Kaki Bé Trai" ,price: 690000 },
                    { product: 1175, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/08/05/fcc042cf933ca9c2c50e187a1888bb4b.JPG", name: "Đầm Babydoll Bé Gái", price: 790000 },
                    { product: 1176, gender: 'kid', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/08/16/24d8078441b06e64a0e2072bf58ace65.jpg", name: "Quần Sooc Bé Trai", price: 449000 },
                    { product: 1177, gender: 'kid', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/07/01/b3907b5a9451d966500f9424287348e6.JPG", name: "Chân Váy Công Chúa", price: 599000 },
                    { product: 1178, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/06/29/ab7a19129943fd6e6b87a736baaf2694.JPG", name: "Áo Thun Polo IVY Kids", price: 320000 },
                    { product: 1179, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/06/29/43fafdd3c36c7adc8844a399d9d8243c.JPG", name: "Áo Sơ Mi Bé Trai", price: 599000 },
                    { product: 1180, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/07/01/7b8aa9f4f41b7ff0bd2ccd40f85a19c0.JPG", name: "Đầm Babydoll Vai Phối Bèo", price: 799000 },
                    { product: 1181, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/06/29/43150715907a90ca56afa7a8a02666ac.JPG", name: "Áo Polo Thêu Chú Khủng Long", price: 349000 },
                    { product: 1182, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/05/12/32f4f51333ea7640652b4fa12eb1f380.JPG", name: "Đầm Xòe Dập Nổi", price: 999000 },
                    { product: 1183, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/07/01/6899165b2d8b5774a2731f8207546864.JPG", name: "Đầm Thun Đuôi Cá", price: 590000 },
                    { product: 1184, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/1600/2022/06/29/59c042f40e73475fc68cb9e06a150762.JPG", name: "Áo Polo Kẻ Ngang", price: 399000 },
                    { product: 1185, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/06/13/d87063688b6c330099d126f9a64c1692.jpg", name: "Áo Polo Bé Trai", price: 349000 },
                    { product: 1186, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/07/01/aa4a671271b08459a647b47fc2f53518.JPG", name: "Đầm Thêu Hoa Vải Thô Đục Lỗ", price: 850000 },
                    { product: 1187, gender: 'kid', brand: 'set', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/07/01/4dfc87245d88b3b916c1a5f0250752a6.JPG", name: "Set Váy Hoa Nhí", price: 1039000},
                    { product: 1188, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/06/06/e5d7589a159ebe8cb79a82fd4b22c0cf.jpg", name: "Áo 3 Lỗ Khủng Long (Kèm Quần)", price: 548000 },
                    { product: 1189, gender: 'kid', brand: 'set', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/05/12/ef295a9ae686e58e6340ee4eca984166.JPG", name: "Set 2 Dây Cool", price: 480000 },
                    { product: 1190, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/06/06/1a64bfc85373f6c721b8df7730b122de.jpg", name: "Áo Thun Basketball", price: 399000 },
                    { product: 1191, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/04/20/30c4002fc5c2c5502fa10405509c5eb1.JPG", name: "Áo Thun Khủng Long Just Chill", price: 399000 },
                    { product: 1192, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/04/15/381c1fcf77e1e6ce99340d1a28e486b7.JPG", name: "Áo Thun Think Happy", price: 299000 },
                    { product: 1193, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/04/15/c4836c99a46c6e63633c0d9babbad892.JPG", name: "Đầm Babydoll Tay Phồng", price: 1190000 },
                    { product: 1194, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/04/15/caea651199e1a1a256eceaa96997d072.JPG", name: "Áo Thun 2 Màu Phối Nơ", price: 350000 },
                    { product: 1195, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/05/20/352e8229ec5c29510521f20ced3de80e.JPG", name: "Áo Thun Note Book", price: 350000 },
                    { product: 1196, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/03/11/cb287f49da8b090c5a8f3038e10ba628.JPG", name: "Đầm 2 Dây", price: 650000 },
                    { product: 1197, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2021/06/02/6b383f34f3310aee59793e14f2636973.jpg", name: "Đầm Tay Kiểu", price: 590000 },
                    { product: 1198, gender: 'kid', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2021/12/22/8c274dffb28143adc21bf15615e157b8.JPG", name: "Chân Váy Thun Xòe 2 Lớp", price: 380000 },
                    { product: 1199, gender: 'kid', brand: 'quan', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/03/11/011664d928db290061b33b9ef83292da.JPG", name: "Quần Sooc Thêu Hoa", price: 399000 },
                    { product: 1200, gender: 'kid', brand: 'ao', img: "https://pubcdn.ivymoda.com/files/product/thumab/400/2022/03/18/5549f7185c499ed5c57457cf792e591b.JPG", name: "Áo Thun Phối Túi Lưới", price: 320000 },
                ];
                localStorage.setItem('products', JSON.stringify(productarray));
            }
        }
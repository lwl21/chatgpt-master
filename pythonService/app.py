from flask import Flask, jsonify ,request
from flask_cors import CORS  # 导入 CORS 扩

app = Flask(__name__)

# 启用 CORS，允许所有来源访问
CORS(app)
# 定义一个测试接口
@app.route('/api/data1', methods=['GET', 'POST'])
def get_data1():
    print("接口被调用了1")
    returnData=[
    {
        "key": "在线数量",
        "value": 1500
    },

]
    data = {
        "data":returnData
    }
    return jsonify(data)
# 定义一个测试接口
@app.route('/api/data2', methods=['GET', 'POST'])
def get_data2():
    
    returnData={'text':"123456789"}
    data = {'text':"123456789"}
    return jsonify(data)


@app.route('/api/data3', methods=['GET', 'POST'])
def get_data3():

    print("接口被调用了3")
    response = {
      
        'data': [
    {
        "key": "在线数量",
        "value": 11111
    },
        {
        "key": "离线数量",
        "value": 310
    },
    {
        "key": "异常数量",
        "value": 210
    }

]
    }
    return jsonify(response), 201
@app.route('/api/data4', methods=['GET', 'POST'])  # 这里可以同时支持 GET 和 POST
def data():
    datas=[{
      "x": "1月",
      "y": 26,
      "s": "系列一",
      "colorField": 100
    }]
    if request.method == 'POST':
        # 处理 POST 请求的逻辑
        print("post111")
        return jsonify({"data":datas})
    print("get11111")
    return jsonify({"data": datas})
if __name__ == '__main__':
    # 运行服务器，默认在 localhost:5000
    app.run(debug=True)
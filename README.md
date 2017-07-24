# active-share
个人将活动从app内分享到外部,识别后台传过来的换行符
## 识别换行符
### 将p标签换成pre标签 设置样式
       pre{
            white-space: pre-wrap;
            word-wrap: break-word;
            font-size: 0.24rem;
            text-indent: 2em;
            font-family: '微软雅黑', Arial;
            line-height: 0.36rem;
          }
        {{if v.type=="text"}}<pre>{{v.content}}</pre>{{/if}}   //即可识别换行符
        {{if v.type=="text"}}<p>{{v.content}}</p>{{/if}}    //不能识别换行符

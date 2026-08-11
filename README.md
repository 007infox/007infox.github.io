# 007INFox News Images Package

## 文件结构
```
.
├── news.js          # 新闻数据文件（已修改图片路径为本地相对路径）
├── images/          # 新闻配图文件夹（20张）
│   ├── news-1.jpg   # 对应 id: 1
│   ├── news-2.jpg   # 对应 id: 2
│   ├── ...
│   └── news-20.jpg  # 对应 id: 20
└── README.md
```

## 使用方法
1. 将 `news.js` 上传到你网站的原位置（替换旧文件）
2. 将 `images/` 文件夹上传到与 `news.js` **同一级目录**下
3. 确保目录结构为：
   ```
   你的网站根目录/
   ├── news.js
   └── images/
       ├── news-1.jpg
       └── ...
   ```

## 图片对应关系
| ID | 新闻标题 | 图片文件 |
|----|---------|---------|
| 1 | 25 States Sue Trump Administration Over Tariffs | news-1.jpg |
| 2 | Federal Reserve Independence Under Attack | news-2.jpg |
| 3 | U.S. Ammunition Stockpiles Depleted After Iran War | news-3.jpg |
| 4 | July Jobs Report: U.S. Employers Cut 23,000 Positions | news-4.jpg |
| 5 | Idaho In-N-Out Shooting Kills 3, Wounds 7 | news-5.jpg |
| 6 | Trump Signs Orders Restricting Birthright Citizenship | news-6.jpg |
| 7 | Tech Industry Sheds 140,000 Jobs in 2026 | news-7.jpg |
| 8 | Appeals Court Blocks White House Ballroom Renovation | news-8.jpg |
| 9 | Armed Man Arrested Near Golf Course Before Trump Event | news-9.jpg |
| 10 | U.S. Closing Five Overseas Diplomatic Posts | news-10.jpg |
| 11 | Navy Commander Warns on Destroyer Shortage | news-11.jpg |
| 12 | Pentagon Orders Defense Industry Boost Production | news-12.jpg |
| 13 | Salvadoran Man Dies in ICE Custody | news-13.jpg |
| 14 | Chicago's Bloody Weekend: 4 Dead, 12 Wounded | news-14.jpg |
| 15 | Strait of Hormuz Standoff Continues | news-15.jpg |
| 16 | NYC 'Socialist' Grocery Plan Sparks Voter-ID Debate | news-16.jpg |
| 17 | U.S. Military Launches 'Western Hemisphere' Task Force | news-17.jpg |
| 18 | Inflation Stays Stubborn at 3.5% | news-18.jpg |
| 19 | U.S.-China Trade Talks Yield No Breakthrough | news-19.jpg |
| 20 | UN Rights Chief Calls for Probes Into ICE Deaths | news-20.jpg |

## 注意事项
- 所有图片已统一转换为 JPEG 格式，宽度不超过 1200px
- 图片路径使用相对路径 `./images/news-X.jpg`，与 news.js 同级
- 如果你的网站目录结构不同，请相应调整 news.js 中的图片路径

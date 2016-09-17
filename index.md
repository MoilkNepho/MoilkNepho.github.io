---
layout: home
title: Moilk主页
---
### ![时间]({{site.baseurl}}/img/myLogo/time.png) 近期更新  

| # | 项目 | 更新时间 |  
| :--:| :--: | :---: |  
| 1 | [Linux图形化系统监视器]({{site.baseurl}}/2016/09/17/SystemMonitor) | 2016-09-17 |  
| 2 | [ccf认证(更新中)]({{site.baseurl}}/blog/category/#CCF) | 2016-09-05 |  
| 3 | [算法-斐波那契数列]({{site.baseurl}}/blog/2016/03/18/algorithms01/) |2016-03-18 |  
| 4 | [国际跳棋]({{site.baseurl}}/2016/02/21/draught) |2016-02-21 |  
| 5 | [贪吃蛇]({{site.baseurl}}/2016/02/20/snake) |2016-02-20 |  
| 6 | [校园卡终端]({{site.baseurl}}/2016/02/15/CampusCardTerminal) |2016-02-15 |  
| 7 | [rolling stone]({{site.baseurl}}/blog/2016/02/01/RollingStone/) | 2016-02-12 |

### ![推荐]({{site.baseurl}}/img/myLogo/tuijian.png) 精彩推荐  
　　分享一个延时D算法：  

```java
    // single-source shortest path problem from s
    public LazyDijkstraSP(EdgeWeightedDigraph G, int s) {
        for (DirectedEdge e : G.edges()) { 
            if (e.weight() < 0)
                throw new IllegalArgumentException("edge " + e + " has negative weight");
        }

        pq = new MinPQ<DirectedEdge>(new ByDistanceFromSource());
        marked = new boolean[G.V()];
        edgeTo = new DirectedEdge[G.V()];
        distTo = new double[G.V()];

        // initialize
        for (int v = 0; v < G.V(); v++)
            distTo[v] = Double.POSITIVE_INFINITY;
        distTo[s] = 0.0;
        relax(G, s);

        // run Dijkstra's algorithm
        while (!pq.isEmpty()) {
            DirectedEdge e = pq.delMin();
            int v = e.from(), w = e.to();
            if (!marked[w]) relax(G, w);   // lazy, so w might already have been relaxed
        }

        // check optimality conditions
        assert check(G, s);
    }
```



************************
> Your time is limited, so don't waste it living someone else's life.…Don't let the noise of others' opinions drown out your own inner voice.  
———> Steven Jobs![sina]({{site.baseurl}}/img/px16/jobs.png)  

![日历]({{site.baseurl}}/img/rili.png) 更新时间： 2016-09-05  
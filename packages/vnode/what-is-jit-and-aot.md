# AOT，JIT是什么？

## JIT

即 Just-in-time,动态(即时)编译，边运行边编译

## AOT

即 Ahead Of Time，指运行前编译

## 区别

这两种编译方式的主要区别在于是否在“运行时”进行编译

优劣JIT优点：可以根据当前硬件情况实时编译生成最优机器指令（ps. AOT也可以做到，在用户使用是使用字节码根据机器情况在做一次编译）可以根据当前程序的运行情况生成最优的机器指令序列当程序需要支持动态链接时，只能使用JIT可以根据进程中内存的实际情况调整代码，使内存能够更充分的利用

JIT缺点：编译需要占用运行时资源，会导致进程卡顿由于编译时间需要占用运行时间，对于某些代码的编译优化不能完全支持，需要在程序流畅和编译时间之间做权衡在编译准备和识别频繁使用的方法需要占用时间，使得初始编译不能达到最高性能

AOT优点：在程序运行前编译，可以避免在运行时的编译性能消耗和内存消耗可以在程序运行初期就达到最高性能可以显著的加快程序的启动

AOT缺点：在程序运行前编译会使程序安装的时间增加牺牲Java的一致性将提前编译的内容保存会占用更多的外

## Vue 中的 JIT/AOT

从 Vue 的构建结果可以看到有全量（编译器+运行时）的资源，也有纯运行时的资源，详情可见：[vue dist assets](https://www.jsdelivr.com/package/npm/vue?tab=files&path=dist)

其中编译器指的是用来将模板字符串编译成为 JavaScript 渲染函数的代码；运行时指的是用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码。基本上就是除去编译器的其它一切

在现代 mv** 框架中所说的 AOT 指的是通过各种编译器插件在打包阶段将 template/jsx 解析渲染为浏览器可执行的 js 逻辑（createElement()），现在的前端框架也都是这么做的。JIT 一般指通过 cdn 引入全量资源后直接编写代码（`template: '<div></div>'`），先经过全量资源中的编译器模块处理为可执行的 js 逻辑再渲染至页面这种实时处理的过程即 JIT
